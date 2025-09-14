import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/db/users';
import { JWTService } from '@/lib/auth/jwt';
import { validateEmail, validatePassword, validatePhoneNumber } from '@/services/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, phoneNumber, address, state, country } = body;

    // Validate required fields
    const errors: { [key: string]: string } = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        errors.password = passwordValidation.message || 'Invalid password';
      }
    }

    if (!firstName?.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!state?.trim()) {
      errors.state = 'State is required';
    }

    if (!country?.trim()) {
      errors.country = 'Country is required';
    }

    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors },
        { status: 400 }
      );
    }

    // Check if email already exists
    const emailExists = await UserService.emailExists(email);
    if (emailExists) {
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Create user
    const newUser = await UserService.createUser({
      email,
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phoneNumber?.trim() || null,
      address: address?.trim() || null,
      state: state.trim(),
      country: country.trim(),
    });

    // Generate tokens
    const tokenPayload = {
      userId: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };

    const accessToken = JWTService.generateToken(tokenPayload);
    const refreshToken = JWTService.generateRefreshToken(tokenPayload);

    // Prepare response
    const response = NextResponse.json({
      success: true,
      message: 'Registration successful',
      token: accessToken,
      refreshToken: refreshToken,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });

    // Set HTTP-only cookies for security
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
    };

    // Set access token cookie
    response.cookies.set('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // Set refresh token cookie
    response.cookies.set('refreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

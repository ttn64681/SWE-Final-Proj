import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JWTService } from './lib/auth/jwt';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard, /api/auth/login)
  const pathname = request.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = ['/admin', '/profile', '/orders'];
  const authRoutes = ['/auth/login', '/auth/register'];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Get the access token from cookies
  const accessToken = request.cookies.get('accessToken')?.value;

  // If accessing a protected route without a token, redirect to login
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If accessing auth routes with a valid token, redirect to home
  if (isAuthRoute && accessToken) {
    const payload = JWTService.verifyToken(accessToken);
    if (payload) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If accessing a protected route with a token, verify it
  if (isProtectedRoute && accessToken) {
    const payload = JWTService.verifyToken(accessToken);
    if (!payload) {
      // Token is invalid, redirect to login
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      // Clear invalid cookies
      response.cookies.set('accessToken', '', { maxAge: 0 });
      response.cookies.set('refreshToken', '', { maxAge: 0 });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

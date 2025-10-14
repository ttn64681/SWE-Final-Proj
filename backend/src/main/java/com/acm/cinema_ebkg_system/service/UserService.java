package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.model.PaymentInfo;
import com.acm.cinema_ebkg_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.acm.cinema_ebkg_system.dto.payment.PaymentRequest;
import com.acm.cinema_ebkg_system.dto.user.UserInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Encrypt function
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.time.LocalDateTime;
import java.time.LocalDate;

/**
 * User Service - Business logic layer for user operations
 * 
 * This service handles all user-related business logic including registration,
 * authentication, and user data management. It ensures proper password hashing
 * and validation before database operations.
 * 
 * Key Responsibilities:
 * - User registration with email uniqueness validation
 * - Password hashing using BCrypt
 * - User authentication (email/password validation)
 * - User data retrieval operations
 * 
 * Security Features:
 * - BCrypt password hashing (salt + hash)
 * - Email uniqueness validation
 * - Secure password comparison (timing attack resistant)
 * 
 * @author ACM Cinema Team
 * @version 1.0
 */
@Service
public class UserService {

    // ========== DEPENDENCY INJECTION ==========
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;  // Data access layer for user operations

    // ========== SECURITY COMPONENTS ==========
    
    /**
     * BCrypt password encoder for secure password hashing
     * - Uses salt for each password hash
     * - Configurable work factor (default: 10)
     * - Timing attack resistant
     */
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ========== USER REGISTRATION ==========
    
    /**
     * Register a new user in the system
     * 
     * Process Flow:
     * 1. Validate email uniqueness (prevent duplicate accounts)
     * 2. Hash the plain text password using BCrypt
     * 3. Save user to database with hashed password
     * 
     * Security Features:
     * - Email uniqueness validation
     * - BCrypt password hashing with salt
     * - Exception handling for duplicate emails
     * 
     * @param user User object containing registration data (password in plain text)
     * @return User Saved user object with hashed password
     * @throws RuntimeException if email already exists
     */
    public User registerUser(User user) {
        // Step 1: Normalize email to lowercase for consistency
        String normalizedEmail = user.getEmail().toLowerCase().trim();
        user.setEmail(normalizedEmail);
        
        // Step 2: Check if user already exists (prevent duplicate accounts)
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("User with email " + user.getEmail() + " already exists");
        }

        // Step 3: Hash the plain text password using BCrypt (includes salt)
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        // Step 4: Save the user to database (timestamps set automatically via @PrePersist)
        return userRepository.save(user);
    }

    // ========== USER AUTHENTICATION ==========
    
    /**
     * Authenticate a user by validating email and password
     * 
     * Process Flow:
     * 1. Find user by email address
     * 2. Verify user exists
     * 3. Compare provided password with stored hash using BCrypt
     * 
     * Security Features:
     * - Timing attack resistant password comparison
     * - BCrypt secure password verification
     * - Clear error messages for debugging
     * 
     * @param email User's email address
     * @param password Plain text password to verify
     * @return User Authenticated user object
     * @throws RuntimeException if user not found or password invalid
     */
    public User authenticateUser(String email, String password) {
        // Step 1: Normalize email to lowercase for consistency
        String normalizedEmail = email.toLowerCase().trim();
        
        // Step 2: Find user by email address
        Optional<User> userOptional = userRepository.findByEmail(normalizedEmail);
        
        // Step 3: Verify user exists
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();
        
        // Step 4: Compare provided password with stored BCrypt hash
        // BCrypt.matches() is timing attack resistant
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    // ========== USER DATA RETRIEVAL ==========
    
    /**
     * Retrieve user by email address
     * 
     * @param email User's email address
     * @return User User object
     * @throws RuntimeException if user not found
     */
    public User getUserByEmail(String email) {
        String normalizedEmail = email.toLowerCase().trim();
        return userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    /**
     * Retrieve user by unique ID
     * 
     * @param id User's unique identifier
     * @return User User object
     * @throws RuntimeException if user not found
     */
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    // ========== PAYMENT INFO MANAGEMENT ==========

    public User addPaymentInfo(Long id, PaymentRequest dtoPayment) {
        // Get user from database using UserRepository
        User user = getUserById(id);
        
        // Create new PaymentInfo object (the model)
        PaymentInfo paymentInfo = new PaymentInfo();
        
        // Extract payment data from DTO
        Long cardNumber = dtoPayment.getCard_number();
        String billingAddress = dtoPayment.getBilling_address();
        LocalDate expirationDate = dtoPayment.getExpiration_date();

        // Set payment fields using setters
        paymentInfo.setCard_number(cardNumber);
        paymentInfo.setBilling_address(billingAddress);
        paymentInfo.setExpiration_date(expirationDate);
        paymentInfo.setUser(user); // Set the JPA relationship

        // Add to user's payment list (JPA relationship)
        if (user.getPaymentInfos().size() < 3) {
            user.getPaymentInfos().add(paymentInfo);
        }
        
        // Save user - JPA automatically saves PaymentInfo too! (cascade = CascadeType.ALL)
        return userRepository.save(user);
    }

    // ========== INCOMPLETE - TO BE IMPLEMENTED ==========
    // public User updatePaymentInfo(Long id, UserInfo dtoUser, PaymentRequest dtoPayment) {
    //     User user = getUserById(dtoPayment.getUser_id());
    //     PaymentInfo paymentInfo = new PaymentInfo();
    //     Integer cardNumber = dtoPayment.getCard_number();
    //     String billingAddress = dtoPayment.getBilling_address();
        

    //     return null;
    // }

    // ========== ADMIN ONLY OPERATIONS ==========

    /**
     * Retrieve all users from the database
     * 
     * This method returns a list of all users in the system.
     * Typically used for administrative purposes.
     * 
     * @return List<User> List of all users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ========== USER DATA UPDATE ==========

    /**
     * Update user's personal information
     * 
     * This method updates a user's personal information based on the provided UserInfo DTO.
     * 
     * @param userId User ID to update
     * @param userInfo UserInfo DTO containing updated information
     * @return User Updated user object
     * @throws RuntimeException if user not found
     */
    public User updatePersonalInfo(Long userId, com.acm.cinema_ebkg_system.dto.user.UserInfo userInfo) {
        User user = getUserById(userId);
        
        // Update fields if provided
        if (userInfo.getFirstName() != null) {
            user.setFirstName(userInfo.getFirstName());
        }
        if (userInfo.getLastName() != null) {
            user.setLastName(userInfo.getLastName());
        }
        if (userInfo.getPhoneNumber() != null) {
            user.setPhoneNumber(userInfo.getPhoneNumber());
        }
        if (userInfo.getAddress() != null) {
            user.setAddress(userInfo.getAddress());
        }
        if (userInfo.getState() != null) {
            user.setState(userInfo.getState());
        }
        if (userInfo.getCountry() != null) {
            user.setCountry(userInfo.getCountry());
        }
        
        return userRepository.save(user);
    }

    /**
     * Update user's password
     * 
     * This method updates a user's password when they request to reset it.
     * 
     * @param userId User ID to update
     * @param userInfo UserInfo DTO containing updated information
     * @return User Updated user object
     * @throws RuntimeException if user not found
     */

    public User resetPassword(Long userId, com.acm.cinema_ebkg_system.dto.user.UserInfo userInfo) {
        User user = getUserById(userId);

        // Get the new password from the DTO
        String newPassword = userInfo.getPassword();

        // Hash the plain text password using BCrypt
        String hashedPassword = passwordEncoder.encode(newPassword);

        // Update the password
        user.setPassword(hashedPassword);

        System.out.println("New password: " + newPassword);
        System.out.println("New hashed password: " + hashedPassword);

        // Save the user to database
        User savedUser = userRepository.save(user);

        System.out.println("Saved hashed password: " + savedUser.getPassword());
        System.out.println("Passwords match: " + passwordEncoder.matches(newPassword, savedUser.getPassword()));
        return savedUser;
    }

    // ========== EMAIL VERIFICATION ==========
    
    /**
     * Generate verification token and send verification email
     * 
     * @param user User to generate token for
     * @return String Generated verification token
     */
    public String generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        LocalDateTime expirationTime = LocalDateTime.now().plusHours(24);
        user.setVerificationToken(token);
        user.setVerificationTokenExpiresAt(expirationTime);
        user.setActive(false);
        User savedUser = userRepository.save(user);
        
        // DEBUG: Log token info
        System.out.println("=== VERIFICATION TOKEN GENERATED ===");
        System.out.println("User Email: " + savedUser.getEmail());
        System.out.println("Token Generated: " + token);
        System.out.println("Token in DB: " + savedUser.getVerificationToken());
        System.out.println("Expires At: " + savedUser.getVerificationTokenExpiresAt());
        System.out.println("====================================");
        
        emailService.sendVerificationEmail(user.getEmail(), token);
        return token;
    }

    /**
     * Verify email using token
     * 
     * @param token Verification token
     * @return User Verified user
     */
    public User verifyEmail(String token) {
        // DEBUG: Log verification attempt
        System.out.println("=== VERIFICATION ATTEMPT ===");
        System.out.println("Token Received: " + token);
        System.out.println("Token Length: " + token.length());
        
        Optional<User> userOptional = userRepository.findByVerificationToken(token);
        if (userOptional.isEmpty()) {
            System.out.println("Result: TOKEN NOT FOUND IN DATABASE");
            System.out.println("===========================");
            throw new RuntimeException("Invalid verification token. This link may have already been used. If you already verified your email, please try logging in.");
        }
        
        User user = userOptional.get();
        System.out.println("Result: TOKEN FOUND for user: " + user.getEmail());
        System.out.println("===========================");
        
        if (user.getVerificationTokenExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Verification token has expired. Please request a new verification email.");
        }
        
        user.setActive(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiresAt(null);
        return userRepository.save(user);
    }

    /**
     * Resend verification email
     * 
     * @param email User's email address
     * @return String New verification token
     */
    public String resendVerificationEmail(String email) {
        User user = getUserByEmail(email);
        if (user.isActive()) {
            throw new RuntimeException("User is already verified");
        }
        return generateVerificationToken(user);
    }
}

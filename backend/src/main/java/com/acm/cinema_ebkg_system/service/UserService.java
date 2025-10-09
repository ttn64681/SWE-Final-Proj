package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
    private UserRepository userRepository;  // Data access layer for user operations

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
        // Step 1: Check if user already exists (prevent duplicate accounts)
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("User with email " + user.getEmail() + " already exists");
        }

        // Step 2: Hash the plain text password using BCrypt (includes salt)
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        // Step 3: Save the user to database (timestamps set automatically via @PrePersist)
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
        // Step 1: Find user by email address
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        // Step 2: Verify user exists
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();
        
        // Step 3: Compare provided password with stored BCrypt hash
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
        return userRepository.findByEmail(email)
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
}

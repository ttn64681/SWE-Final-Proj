package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.model.PaymentInfo;
import com.acm.cinema_ebkg_system.repository.UserRepository;
import com.acm.cinema_ebkg_system.dto.payment.PaymentRequest;
import com.acm.cinema_ebkg_system.dto.user.UserInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Encrypt function

import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;
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

    // ========== USER DATA UPDATE ==========

    /**
     * Update a user's personal info (used in editing profile or during account creation)
     * Uses a DTO to update only the params the user requests to change
     * @return User with updated information
     */
    public User updatePersonalInfo(Long id, UserInfo dtoUser) {
        User user = getUserById(id);
        String firstName = dtoUser.getFirstName();
        String lastName = dtoUser.getLastName();
        String address = dtoUser.getAddress();
        String country = dtoUser.getCountry();
        String state = dtoUser.getState();
        String phoneNumber = dtoUser.getPhoneNumber();

        if (firstName != null) { user.setFirstName(firstName); }
        if (lastName != null) { user.setLastName(lastName); }
        if (address != null) { user.setAddress(address); }
        if (country != null) { user.setCountry(country); }
        if (state != null) { user.setState(state); }
        if (phoneNumber != null) { user.setPhoneNumber(phoneNumber); }

        return userRepository.save(user);
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

    public User updatePaymentInfo(Long userId, Long paymentInfoId, PaymentRequest dtoPayment) {

        // Gets user and their associated payment information (0-3)
        User user = getUserById(userId);
        List<PaymentInfo> userPaymentInfos = user.getPaymentInfos();
        PaymentInfo updatedPaymentInfo = null;
        
        // Checks to see if passed in payment info ID matches the user's payment info ID
        int counter = 0;
        int index = -1;
        for (PaymentInfo currentPaymentInfo : userPaymentInfos) {

            // If found a match, sets the currentPaymentInfo to a new "updatedPaymentInfo" object
            if (currentPaymentInfo.getPayment_info_id() == paymentInfoId) {
                updatedPaymentInfo = currentPaymentInfo;
                index = counter;
            }
            counter++;
        }

        // Checks to see if the payment info ID was found
        if (updatedPaymentInfo != null) {

            // "updatedPaymentInfo" object is updated to whatever is passed in through dtoPayment
            Long cardNumber = dtoPayment.getCard_number();
            String billingAddress = dtoPayment.getBilling_address();
            LocalDate expirationDate = dtoPayment.getExpiration_date();
            
            if (cardNumber != null) updatedPaymentInfo.setCard_number(cardNumber);
            if (billingAddress != null) updatedPaymentInfo.setBilling_address(billingAddress);
            if (expirationDate != null) updatedPaymentInfo.setExpiration_date(expirationDate);
            
            // Replace the "currentPaymentInfo" with "updatedPaymentInfo"
            List<PaymentInfo> updatedPaymentInfos = user.getPaymentInfos();
            updatedPaymentInfos.remove(index);
            updatedPaymentInfos.add(index, updatedPaymentInfo);
            user.setPaymentInfos(updatedPaymentInfos);
        }

        return userRepository.save(user);
    }

    public User deletePaymentInfo(Long userId, Long paymentInfoId) {
        User user = getUserById(userId);
        List<PaymentInfo> userPaymentInfos = user.getPaymentInfos();        
        
        // Checks to see if passed in payment info ID matches the user's payment info ID
        int counter = 0;
        int index = -1;
        for (PaymentInfo currentPaymentInfo : userPaymentInfos) {

            // Removed payment info if match found
            if (currentPaymentInfo.getPayment_info_id() == paymentInfoId) {
                index = counter;
            }
            counter++;
        }

        List<PaymentInfo> newPaymentInfos = user.getPaymentInfos();
        newPaymentInfos.remove(index);
        user.setPaymentInfos(newPaymentInfos);

        return userRepository.save(user);
    }
    /**
     * Reset a user's password when they request to
     * @return User with updated password
     */
    
     /* 
     public String resetPassword(Long id, String newPassword) {
        User user = getUserById(id);
        
        String oldPassword = user.getPassword();

        userRepository.save(user);
        return newPassword;
        
     } */

    // ========== ADMIN ONLY OPERATIONS ==========

    /**
     * Retrieve all users in the system (for admin use)
     * * @return List<User> List of all users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}

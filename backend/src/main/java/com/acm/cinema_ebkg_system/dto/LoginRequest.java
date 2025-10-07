package com.acm.cinema_ebkg_system.dto;

/**
 * Login Request DTO - Data Transfer Object for user authentication
 * 
 * This DTO represents the data structure sent from the frontend during user login.
 * It contains the credentials needed to authenticate an existing user.
 * 
 * Fields:
 * - email: User's email address (used as username)
 * - password: Plain text password (will be verified against stored hash)
 * - rememberMe: Optional flag for extended session duration
 * 
 * Usage:
 * This DTO is used in the AuthController.login() endpoint to receive
 * login credentials from the frontend and authenticate the user.
 * 
 * @author ACM Cinema Team
 * @version 1.0
 */
public class LoginRequest {
    // ========== LOGIN FIELDS ==========
    
    private String email;        // User's email address (required)
    private String password;     // Plain text password (required)
    private boolean rememberMe;  // Optional flag for extended session

    // ========== CONSTRUCTORS ==========
    
    /**
     * Default constructor required for JSON deserialization
     */
    public LoginRequest() {}

    /**
     * Constructor with all fields for creating a complete login request
     * 
     * @param email User's email address
     * @param password Plain text password
     * @param rememberMe Whether to remember the user for extended session
     */
    public LoginRequest(String email, String password, boolean rememberMe) {
        this.email = email;
        this.password = password;
        this.rememberMe = rememberMe;
    }

    // ========== GETTERS AND SETTERS ==========
    // Standard getter/setter methods for all fields
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isRememberMe() {
        return rememberMe;
    }

    public void setRememberMe(boolean rememberMe) {
        this.rememberMe = rememberMe;
    }
}

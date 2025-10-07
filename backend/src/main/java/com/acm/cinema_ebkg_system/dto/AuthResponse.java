package com.acm.cinema_ebkg_system.dto;

/**
 * Auth Response DTO - Data Transfer Object for authentication responses
 * 
 * This DTO represents the response structure sent back to the frontend after
 * authentication operations (register, login, refresh, logout).
 * 
 * Fields:
 * - success: Boolean indicating if the operation was successful
 * - message: Human-readable message describing the result
 * - token: JWT access token (for successful auth operations)
 * - refreshToken: JWT refresh token (for successful auth operations)
 * - user: User data DTO (excludes sensitive information like password)
 * 
 * Usage:
 * This DTO is used in all AuthController endpoints to provide consistent
 * response structure to the frontend, including success status, messages,
 * and authentication tokens.
 * 
 * @author ACM Cinema Team
 * @version 1.0
 */
public class AuthResponse {
    // ========== RESPONSE FIELDS ==========
    
    private boolean success;      // Operation success status
    private String message;       // Human-readable response message
    private String token;         // JWT access token (for successful auth)
    private String refreshToken;  // JWT refresh token (for successful auth)
    private UserDto user;         // User data (excludes sensitive info)

    // ========== CONSTRUCTORS ==========
    
    /**
     * Default constructor required for JSON serialization
     */
    public AuthResponse() {}

    /**
     * Constructor for simple success/failure responses (logout, errors)
     * 
     * @param success Whether the operation was successful
     * @param message Response message
     */
    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    /**
     * Constructor for successful authentication responses (register, login)
     * 
     * @param success Whether the operation was successful
     * @param message Response message
     * @param token JWT access token
     * @param refreshToken JWT refresh token
     * @param user User data DTO
     */
    public AuthResponse(boolean success, String message, String token, String refreshToken, UserDto user) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.refreshToken = refreshToken;
        this.user = user;
    }

    // ========== GETTERS AND SETTERS ==========
    // Standard getter/setter methods for all fields
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    // ========== INNER CLASSES ==========
    
    /**
     * User DTO - Data Transfer Object for user information in responses
     * 
     * This inner class represents user data that is safe to send to the frontend.
     * It excludes sensitive information like passwords and includes only the
     * necessary user details for the client application.
     * 
     * Security Note: This DTO intentionally excludes the password field to
     * prevent accidental exposure of sensitive authentication data.
     */
    public static class UserDto {
        // ========== USER DATA FIELDS ==========
        
        private Long id;           // User's unique identifier
        private String email;      // User's email address
        private String firstName;  // User's first name
        private String lastName;   // User's last name
        private String phoneNumber; // User's phone number
        private String address;    // User's street address
        private String state;      // User's state/province
        private String country;    // User's country

        // ========== CONSTRUCTORS ==========
        
        /**
         * Default constructor required for JSON serialization
         */
        public UserDto() {}

        /**
         * Constructor with all user data fields
         * 
         * @param id User's unique identifier
         * @param email User's email address
         * @param firstName User's first name
         * @param lastName User's last name
         * @param phoneNumber User's phone number
         * @param address User's street address
         * @param state User's state/province
         * @param country User's country
         */
        public UserDto(Long id, String email, String firstName, String lastName, 
                      String phoneNumber, String address, String state, String country) {
            this.id = id;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.phoneNumber = phoneNumber;
            this.address = address;
            this.state = state;
            this.country = country;
        }

        // ========== GETTERS AND SETTERS ==========
        // Standard getter/setter methods for all fields
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getState() {
            return state;
        }

        public void setState(String state) {
            this.state = state;
        }

        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }
    }
}

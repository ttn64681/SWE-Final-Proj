package com.acm.cinema_ebkg_system.dto.auth;

/**
 * Reset Password Request DTO
 * 
 * This DTO contains the data required to reset a user's password using a reset token.
 * 
 * @author ACM Cinema Team
 * @version 1.0
 */
public class ResetPasswordRequest {
    private String token;
    private String newPassword;

    // Default constructor
    public ResetPasswordRequest() {}

    // Constructor with parameters
    public ResetPasswordRequest(String token, String newPassword) {
        this.token = token;
        this.newPassword = newPassword;
    }

    // Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}


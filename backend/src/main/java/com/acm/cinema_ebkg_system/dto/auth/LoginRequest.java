package com.acm.cinema_ebkg_system.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                    // Lombok: auto-generates getters, setters, toString, equals, hashCode
@NoArgsConstructor      // Lombok: generates default constructor
@AllArgsConstructor     // Lombok: generates constructor with all fields
public class LoginRequest {
    private String email;
    private String password;
    private boolean rememberMe;
}

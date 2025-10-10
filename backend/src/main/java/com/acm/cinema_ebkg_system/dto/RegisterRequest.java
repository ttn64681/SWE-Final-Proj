package com.acm.cinema_ebkg_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                    // Lombok: auto-generates getters, setters, toString, equals, hashCode
@NoArgsConstructor      // Lombok: generates default constructor
@AllArgsConstructor     // Lombok: generates constructor with all fields
public class RegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String state;
    private String country;
}

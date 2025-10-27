package com.acm.cinema_ebkg_system.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    private String email;
    private String currentPassword;
    private String newPassword;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String state;
    private String country;
    private Boolean enrolledForPromotions;
}

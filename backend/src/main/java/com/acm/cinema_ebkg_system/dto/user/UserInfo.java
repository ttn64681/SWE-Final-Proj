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
    
    // Old deprecated fields (kept for backward compatibility but not used)
    @Deprecated
    private String address;
    @Deprecated
    private String state;
    @Deprecated
    private String country;
    
    // New home address fields (stored in address table)
    private String homeStreet;
    private String homeCity;
    private String homeState;
    private String homeZip;
    private String homeCountry;
    
    // User preferences
    private Boolean enrolledForPromotions;
    
    // Profile picture (base64 encoded image)
    private String profileImageLink;
}

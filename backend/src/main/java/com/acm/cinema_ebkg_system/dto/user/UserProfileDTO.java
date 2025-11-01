package com.acm.cinema_ebkg_system.dto.user;

import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.model.Address;
import lombok.Data;

/**
 * DTO for user profile response
 * Consolidates user info and home address into one response
 * Note: Payment cards are fetched separately on the payments page
 */
@Data
public class UserProfileDTO {
    private User user;
    private Address homeAddress;
}

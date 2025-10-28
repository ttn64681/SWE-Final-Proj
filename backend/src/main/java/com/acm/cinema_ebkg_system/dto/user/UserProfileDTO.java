package com.acm.cinema_ebkg_system.dto.user;

import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.model.Address;
import com.acm.cinema_ebkg_system.model.PaymentCard;
import lombok.Data;
import java.util.List;

/**
 * DTO for user profile response
 * Consolidates user info, home address, and payment cards into one response
 */
@Data
public class UserProfileDTO {
    private User user;
    private Address homeAddress;
    private List<PaymentCard> paymentCards;
}

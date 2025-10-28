package com.acm.cinema_ebkg_system.dto.auth;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Boolean enrolledForPromotions;
    
    // Home address fields (optional)
    private String homeAddress;
    private String homeCity;
    private String homeState;
    private String homeZip;
    private String homeCountry;
    
    private List<PaymentCardInfo> paymentCards; // Up to 3 payment cards
    
    // Nested class for payment card information
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentCardInfo {
        private String cardType;
        private String cardNumber; // Note: CVV is NOT sent to backend for security
        private String expirationDate;
        private String cardholderName;
        private String billingStreet;
        private String billingCity;
        private String billingState;
        private String billingZip;
        private Boolean isDefault;
    }
}

package com.acm.cinema_ebkg_system.dto.payment;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Payment Card DTO for frontend requests
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCardDTO {
    private Long userId;
    private String cardType;
    private String cardNumber;
    private String expirationDate;
    private String cardholderName;
    private String billingStreet;
    private String billingCity;
    private String billingState;
    private String billingZip;
    private String billingCountry;
    private Boolean isDefault;
}


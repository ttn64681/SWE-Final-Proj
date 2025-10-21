package com.acm.cinema_ebkg_system.dto.payment;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    
    private String cardholder_name;
    private Long card_number;
    private String billing_address;
    private LocalDate expiration_date;    
}

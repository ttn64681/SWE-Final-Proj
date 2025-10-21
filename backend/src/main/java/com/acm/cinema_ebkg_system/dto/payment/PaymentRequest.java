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
    private String card_number;
    private String billing_address;
<<<<<<< HEAD
    private LocalDate expiration_date;    
=======
    private LocalDate expiration_date;
>>>>>>> f98bd145d2b7c048a948eab9318a73e2246f4a63
}

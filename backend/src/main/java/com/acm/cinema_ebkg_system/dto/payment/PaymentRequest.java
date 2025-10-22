package com.acm.cinema_ebkg_system.dto.payment;

import com.acm.cinema_ebkg_system.model.Address;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    
    private Long cardNumber;
    private Address billingAddress;
    private LocalDate expirationDate;    
}

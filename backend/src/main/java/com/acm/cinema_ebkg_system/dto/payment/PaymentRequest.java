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

    // Temporary manual getters/setters until Lombok annotation processing works
    public String getCardholder_name() { return cardholder_name; }
    public void setCardholder_name(String cardholder_name) { this.cardholder_name = cardholder_name; }
    
    public Long getCard_number() { return card_number; }
    public void setCard_number(Long card_number) { this.card_number = card_number; }
    
    public String getBilling_address() { return billing_address; }
    public void setBilling_address(String billing_address) { this.billing_address = billing_address; }
    
    public LocalDate getExpiration_date() { return expiration_date; }
    public void setExpiration_date(LocalDate expiration_date) { this.expiration_date = expiration_date; }
}

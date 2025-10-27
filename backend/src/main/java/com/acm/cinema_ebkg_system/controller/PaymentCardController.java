package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.PaymentCard;
import com.acm.cinema_ebkg_system.model.Address;
import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.service.PaymentCardService;
import com.acm.cinema_ebkg_system.service.AddressService;
import com.acm.cinema_ebkg_system.service.UserService;
import com.acm.cinema_ebkg_system.dto.payment.PaymentCardDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * Payment Card Controller
 */
@RestController
@RequestMapping("/api/payment-card")
public class PaymentCardController {
    
    @Autowired // Spring automatically provides service instance (dependency injection)
    private PaymentCardService paymentCardService;
    
    @Autowired
    private AddressService addressService;
    
    @Autowired
    private UserService userService;
    
    /**
     * GET /api/payment-cards/user/{userId}
     * Input: userId (Long) in URL path
     * Returns: List<PaymentCard> - all payment cards for user (default first)
     */
    @GetMapping("/user/{userId}")
    public List<PaymentCard> getUserPaymentCards(@PathVariable Long userId) {
        return paymentCardService.getUserPaymentCards(userId);
    }
    
    /**
     * GET /api/payment-cards/user/{userId}/default
     * Input: userId (Long) in URL path
     * Returns: 404 Not Found if no default card, otherwise PaymentCard
     */
    @GetMapping("/user/{userId}/default")
    public ResponseEntity<PaymentCard> getUserDefaultCard(@PathVariable Long userId) {
        Optional<PaymentCard> defaultCard = paymentCardService.getUserDefaultCard(userId);
        return defaultCard.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * POST /api/payment-cards
     * Input: PaymentCardDTO JSON body with {userId, cardType, cardNumber, expirationDate, cardholderName, billingStreet, billingCity, billingState, billingZip, billingCountry, isDefault}
     * Returns: PaymentCard - created card with ID and timestamps (auto-sets as default if first card)
     */
    @PostMapping
    public ResponseEntity<?> createPaymentCard(@RequestBody PaymentCardDTO dto) {
        try {
            // Get user
            User user = userService.getUserById(dto.getUserId());
            
            // Create billing address
            Address address = new Address();
            address.setUser(user);
            address.setAddressType("billing");
            address.setStreet(dto.getBillingStreet());
            address.setCity(dto.getBillingCity());
            address.setState(dto.getBillingState());
            address.setZip(dto.getBillingZip());
            address.setCountry(dto.getBillingCountry() != null ? dto.getBillingCountry() : "US");
            Address savedAddress = addressService.createAddress(address);
            
            // Create payment card
            PaymentCard paymentCard = new PaymentCard();
            paymentCard.setUser(user);
            paymentCard.setAddress(savedAddress);
            paymentCard.setCardNumber(dto.getCardNumber());
            paymentCard.setCardholderName(dto.getCardholderName());
            paymentCard.setPaymentCardType(dto.getCardType());
            paymentCard.setExpirationDate(dto.getExpirationDate());
            paymentCard.setIsDefault(dto.getIsDefault() != null ? dto.getIsDefault() : false);
            
            PaymentCard created = paymentCardService.createPaymentCard(paymentCard);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating payment card: " + e.getMessage());
        }
    }
    
    /**
     * PUT /api/payment-cards/{paymentCardId}
     * Input: paymentCardId (Long) in URL path, PaymentCard JSON body with updated fields
     * Returns: PaymentCard - updated card
     */
    @PutMapping("/{paymentCardId}")
    public PaymentCard updatePaymentCard(
            @PathVariable Long paymentCardId, 
            @RequestBody PaymentCard paymentCard) {
        paymentCard.setId(paymentCardId);
        return paymentCardService.updatePaymentCard(paymentCard);
    }
    
    /**
     * PUT /api/payment-cards/user/{userId}/set-default/{paymentCardId}
     * Input: userId (Long), paymentCardId (Long) in URL path
     * Returns: 200 OK - default card changed (no body)
     */
    @PutMapping("/user/{userId}/set-default/{paymentCardId}")
    public ResponseEntity<Void> setDefaultCard(
            @PathVariable Long userId, 
            @PathVariable Long paymentCardId) {
        paymentCardService.setDefaultCard(userId, paymentCardId);
        return ResponseEntity.ok().build();
    }
    
    /**
     * DELETE /api/payment-cards/{paymentCardId}
     * Input: paymentCardId (Long) in URL path
     * Returns: 200 OK - card deleted (no body)
     */
    @DeleteMapping("/{paymentCardId}")
    public ResponseEntity<Void> deletePaymentCard(@PathVariable Long paymentCardId) {
        paymentCardService.deletePaymentCard(paymentCardId);
        return ResponseEntity.ok().build();
    }
}

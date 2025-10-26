package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.PaymentCard;
import com.acm.cinema_ebkg_system.service.PaymentCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * Payment Card Controller
 */
@RestController
@RequestMapping("/api/payment-cards")
public class PaymentCardController {
    
    @Autowired // Spring automatically provides service instance (dependency injection)
    private PaymentCardService paymentCardService;
    
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
     * Input: PaymentCard JSON body with {user_id, address_id, card_number, cardholder_name, payment_card_type, expiration_date, cvv}
     * Returns: PaymentCard - created card with ID and timestamps (auto-sets as default if first card)
     */
    @PostMapping
    public PaymentCard createPaymentCard(@RequestBody PaymentCard paymentCard) {
        return paymentCardService.createPaymentCard(paymentCard);
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

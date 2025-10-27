package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.PaymentCard;
import com.acm.cinema_ebkg_system.service.PaymentCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * Payment Card Controller - REST API endpoints for payment card management
 * 
 * Provides REST endpoints for payment card operations including CRUD operations,
 * default card management, and user-specific queries.
 */
@RestController
@RequestMapping("/api/payment-cards")
@CrossOrigin(origins = "*")
public class PaymentCardController {
    
    @Autowired
    private PaymentCardService paymentCardService;
    
    /**
     * Get all payment cards for a specific user
     * @param userId the user ID
     * @return list of payment cards for the user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentCard>> getUserPaymentCards(@PathVariable Long userId) {
        List<PaymentCard> paymentCards = paymentCardService.getUserPaymentCards(userId);
        return ResponseEntity.ok(paymentCards);
    }
    
    /**
     * Get user's default payment card
     * @param userId the user ID
     * @return default payment card or 404 if not found
     */
    @GetMapping("/user/{userId}/default")
    public ResponseEntity<PaymentCard> getUserDefaultCard(@PathVariable Long userId) {
        Optional<PaymentCard> defaultCard = paymentCardService.getUserDefaultCard(userId);
        return defaultCard.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Create a new payment card
     * @param paymentCard the payment card to create
     * @return the created payment card
     */
    @PostMapping
    public ResponseEntity<PaymentCard> createPaymentCard(@RequestBody PaymentCard paymentCard) {
        PaymentCard createdCard = paymentCardService.createPaymentCard(paymentCard);
        return ResponseEntity.ok(createdCard);
    }
    
    /**
     * Update an existing payment card
     * @param paymentCardId the payment card ID
     * @param paymentCard the payment card data to update
     * @return the updated payment card
     */
    @PutMapping("/{paymentCardId}")
    public ResponseEntity<PaymentCard> updatePaymentCard(
            @PathVariable Long paymentCardId, 
            @RequestBody PaymentCard paymentCard) {
        paymentCard.setId(paymentCardId);
        PaymentCard updatedCard = paymentCardService.updatePaymentCard(paymentCard);
        return ResponseEntity.ok(updatedCard);
    }
    
    /**
     * Set a payment card as the default for a user
     * @param userId the user ID
     * @param paymentCardId the payment card ID to set as default
     * @return success response
     */
    @PutMapping("/user/{userId}/set-default/{paymentCardId}")
    public ResponseEntity<Void> setDefaultCard(
            @PathVariable Long userId, 
            @PathVariable Long paymentCardId) {
        paymentCardService.setDefaultCard(userId, paymentCardId);
        return ResponseEntity.ok().build();
    }
    
    /**
     * Delete a payment card
     * @param paymentCardId the payment card ID to delete
     * @return success response
     */
    @DeleteMapping("/{paymentCardId}")
    public ResponseEntity<Void> deletePaymentCard(@PathVariable Long paymentCardId) {
        paymentCardService.deletePaymentCard(paymentCardId);
        return ResponseEntity.ok().build();
    }
}

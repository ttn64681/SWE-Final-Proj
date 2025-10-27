package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.PaymentCard;
import com.acm.cinema_ebkg_system.repository.PaymentCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Payment Card Service - Business logic layer for payment card management
 * 
 * Provides business logic for payment card operations including CRUD operations,
 * default card management, and user-specific queries.
 */
@Service
public class PaymentCardService {
    
    @Autowired
    private PaymentCardRepository paymentCardRepository;
    
    /**
     * Get all payment cards for a user ordered by default status
     * @param userId the user ID
     * @return list of payment cards ordered by default status
     */
    public List<PaymentCard> getUserPaymentCards(Long userId) {
        return paymentCardRepository.findByUserIdOrderByIsDefaultDesc(userId);
    }
    
    /**
     * Get user's default payment card
     * @param userId the user ID
     * @return optional default payment card
     */
    public Optional<PaymentCard> getUserDefaultCard(Long userId) {
        return paymentCardRepository.findByUserIdAndIsDefault(userId, true);
    }
    
    /**
     * Create a new payment card
     * If this is the user's first card, it will be set as default
     * @param paymentCard the payment card to create
     * @return the created payment card
     */
    public PaymentCard createPaymentCard(PaymentCard paymentCard) {
        // If this is the first card, make it default
        List<PaymentCard> existingCards = getUserPaymentCards(paymentCard.getUser().getId());
        if (existingCards.isEmpty()) {
            paymentCard.setIsDefault(true);
        }
        return paymentCardRepository.save(paymentCard);
    }
    
    /**
     * Update an existing payment card
     * @param paymentCard the payment card to update
     * @return the updated payment card
     */
    public PaymentCard updatePaymentCard(PaymentCard paymentCard) {
        return paymentCardRepository.save(paymentCard);
    }
    
    /**
     * Delete a payment card by ID
     * @param paymentCardId the payment card ID to delete
     */
    public void deletePaymentCard(Long paymentCardId) {
        paymentCardRepository.deleteById(paymentCardId);
    }
    
    /**
     * Set a payment card as the default for a user
     * This will remove the default status from all other cards
     * @param userId the user ID
     * @param paymentCardId the payment card ID to set as default
     */
    public void setDefaultCard(Long userId, Long paymentCardId) {
        // Remove default from all cards
        List<PaymentCard> userCards = getUserPaymentCards(userId);
        for (PaymentCard card : userCards) {
            card.setIsDefault(false);
            paymentCardRepository.save(card);
        }
        
        // Set new default
        Optional<PaymentCard> newDefaultCard = paymentCardRepository.findById(paymentCardId);
        if (newDefaultCard.isPresent()) {
            newDefaultCard.get().setIsDefault(true);
            paymentCardRepository.save(newDefaultCard.get());
        }
    }
}

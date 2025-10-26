package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.PaymentCard;
import com.acm.cinema_ebkg_system.repository.PaymentCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Payment Card Service
 */
@Service
public class PaymentCardService {
    
    @Autowired // Spring automatically provides repository instance (dependency injection)
    private PaymentCardRepository paymentCardRepository;
    
    /**
     * Get all payment cards for a user (default first)
     * @param userId - Long: User ID
     * @return List<PaymentCard>: Payment cards ordered by default status
     */
    public List<PaymentCard> getUserPaymentCards(Long userId) {
        return paymentCardRepository.findByUserIdOrderByIsDefaultDesc(userId);
    }
    
    /**
     * Get user's default payment card
     * @param userId - Long: User ID
     * @return Optional<PaymentCard>: Default card if exists, empty if not
     */
    public Optional<PaymentCard> getUserDefaultCard(Long userId) {
        return paymentCardRepository.findByUserIdAndIsDefault(userId, true);
    }
    
    /**
     * Create a new payment card (auto-sets as default if first card)
     * @param paymentCard - PaymentCard: Card object with user_id, address_id, card_number, cardholder_name, payment_card_type, expiration_date, cvv
     * @return PaymentCard: Created card with generated ID and timestamps
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
     * @param paymentCard - PaymentCard: Card object with ID and updated fields
     * @return PaymentCard: Updated card
     */
    public PaymentCard updatePaymentCard(PaymentCard paymentCard) {
        return paymentCardRepository.save(paymentCard);
    }
    
    /**
     * Delete a payment card
     * @param paymentCardId - Long: Card ID to delete
     */
    public void deletePaymentCard(Long paymentCardId) {
        paymentCardRepository.deleteById(paymentCardId);
    }
    
    /**
     * Set a payment card as default (removes default from others)
     * @param userId - Long: User ID
     * @param paymentCardId - Long: Card ID to set as default
     */
    @Transactional // Ensures all card updates succeed or fail together (atomicity)
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

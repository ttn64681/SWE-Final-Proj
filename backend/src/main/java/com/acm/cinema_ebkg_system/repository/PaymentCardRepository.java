package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.PaymentCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Payment Card Repository - Data access layer for PaymentCard entities
 * 
 * Provides CRUD operations and custom query methods for payment card management.
 * Supports finding payment cards by user, default status, and card type.
 */
@Repository
public interface PaymentCardRepository extends JpaRepository<PaymentCard, Long> {
    
    /**
     * Find all payment cards for a specific user
     * @param userId the user ID
     * @return list of payment cards for the user
     */
    List<PaymentCard> findByUserId(Long userId);
    
    /**
     * Find payment cards for a user by default status
     * @param userId the user ID
     * @param isDefault whether the card is default or not
     * @return optional payment card matching the criteria
     */
    Optional<PaymentCard> findByUserIdAndIsDefault(Long userId, Boolean isDefault);
    
    /**
     * Find all payment cards for a user ordered by default status (default first)
     * @param userId the user ID
     * @return list of payment cards ordered by default status
     */
    List<PaymentCard> findByUserIdOrderByIsDefaultDesc(Long userId);
    
    /**
     * Find all payment cards by card type
     * @param paymentCardType the payment card type ('visa', 'mastercard', 'amex', 'discover')
     * @return list of payment cards matching the type
     */
    List<PaymentCard> findByPaymentCardType(String paymentCardType);
}

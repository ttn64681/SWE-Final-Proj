package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.PaymentCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Payment Card Repository - Data access layer for PaymentCard entities
 * 
 * Automatically provides standard CRUD operations:
 * - save(), findById(), findAll(), deleteById(), count(), existsById()
 * 
 * Custom query methods based on property names:
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
}

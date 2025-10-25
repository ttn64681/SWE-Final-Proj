package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.PaymentCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Payment Card Repository
 * 
 * Automatically provides: save(), findById(), findAll(), deleteById(), count(), existsById()
 */
@Repository
public interface PaymentCardRepository extends JpaRepository<PaymentCard, Long> {
    
    List<PaymentCard> findByUserId(Long userId);
    Optional<PaymentCard> findByUserIdAndIsDefault(Long userId, Boolean isDefault);
    List<PaymentCard> findByUserIdOrderByIsDefaultDesc(Long userId);
}

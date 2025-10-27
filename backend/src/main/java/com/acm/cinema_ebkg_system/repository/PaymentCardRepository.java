package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.PaymentCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    
    @Query("SELECT pc FROM PaymentCard pc WHERE pc.user.id = :userId ORDER BY pc.isDefault DESC")
    List<PaymentCard> findByUserIdOrderByIsDefaultDesc(@Param("userId") Long userId);
    
    @Query("SELECT pc FROM PaymentCard pc WHERE pc.user.id = :userId AND pc.isDefault = :isDefault")
    Optional<PaymentCard> findByUserIdAndIsDefault(@Param("userId") Long userId, @Param("isDefault") Boolean isDefault);
}

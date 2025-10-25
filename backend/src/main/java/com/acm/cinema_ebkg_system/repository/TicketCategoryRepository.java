package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.TicketCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Ticket Category Repository
 * 
 * Automatically provides: save(), findById(), findAll(), deleteById(), count(), existsById()
 */
@Repository
public interface TicketCategoryRepository extends JpaRepository<TicketCategory, Long> {
    
    Optional<TicketCategory> findByName(String name);
    List<TicketCategory> findAllByOrderByPriceAsc();
}

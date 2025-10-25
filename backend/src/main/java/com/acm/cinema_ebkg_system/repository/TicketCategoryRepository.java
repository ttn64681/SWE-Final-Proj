package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.TicketCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Ticket Category Repository - Data access layer for TicketCategory entities
 * 
 * Provides CRUD operations and custom query methods for ticket category management.
 * Supports finding ticket categories by name and price ranges.
 */
@Repository
public interface TicketCategoryRepository extends JpaRepository<TicketCategory, Long> {
    
    /**
     * Find ticket category by name
     * @param name the ticket category name ('child', 'senior', 'adult')
     * @return optional ticket category matching the name
     */
    Optional<TicketCategory> findByName(String name);
    
    /**
     * Find all ticket categories ordered by price (ascending)
     * @return list of ticket categories ordered by price
     */
    List<TicketCategory> findAllByOrderByPriceAsc();
    
    /**
     * Find ticket categories with price greater than specified amount
     * @param price the minimum price
     * @return list of ticket categories with price greater than specified
     */
    List<TicketCategory> findByPriceGreaterThan(BigDecimal price);
}

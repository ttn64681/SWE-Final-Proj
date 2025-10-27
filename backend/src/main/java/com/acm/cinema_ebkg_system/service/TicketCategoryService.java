package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.TicketCategory;
import com.acm.cinema_ebkg_system.repository.TicketCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Ticket Category Service - Business logic layer for ticket category management
 * 
 * Provides business logic for ticket category operations including CRUD operations
 * and specialized queries for pricing and category management.
 */
@Service
public class TicketCategoryService {
    
    @Autowired
    private TicketCategoryRepository ticketCategoryRepository;
    
    /**
     * Get all ticket categories ordered by price (ascending)
     * @return list of ticket categories ordered by price
     */
    public List<TicketCategory> getAllTicketCategories() {
        return ticketCategoryRepository.findAllByOrderByPriceAsc();
    }
    
    /**
     * Get ticket category by name
     * @param name the ticket category name ('child', 'senior', 'adult')
     * @return optional ticket category matching the name
     */
    public Optional<TicketCategory> getTicketCategoryByName(String name) {
        return ticketCategoryRepository.findByName(name);
    }
    
    /**
     * Get ticket categories with price greater than specified amount
     * @param minPrice the minimum price
     * @return list of ticket categories with price greater than specified
     */
    public List<TicketCategory> getTicketCategoriesByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return ticketCategoryRepository.findByPriceGreaterThan(minPrice);
    }
    
    /**
     * Create a new ticket category
     * @param ticketCategory the ticket category to create
     * @return the created ticket category
     */
    public TicketCategory createTicketCategory(TicketCategory ticketCategory) {
        return ticketCategoryRepository.save(ticketCategory);
    }
    
    /**
     * Update an existing ticket category
     * @param ticketCategory the ticket category to update
     * @return the updated ticket category
     */
    public TicketCategory updateTicketCategory(TicketCategory ticketCategory) {
        return ticketCategoryRepository.save(ticketCategory);
    }
    
    /**
     * Delete a ticket category by ID
     * @param ticketCategoryId the ticket category ID to delete
     */
    public void deleteTicketCategory(Long ticketCategoryId) {
        ticketCategoryRepository.deleteById(ticketCategoryId);
    }
}

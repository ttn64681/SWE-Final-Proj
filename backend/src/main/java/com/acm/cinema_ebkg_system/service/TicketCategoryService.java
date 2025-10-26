package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.TicketCategory;
import com.acm.cinema_ebkg_system.repository.TicketCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Ticket Category Service
 */
@Service
public class TicketCategoryService {
    
    @Autowired
    private TicketCategoryRepository ticketCategoryRepository;
    
    /**
     * Get all ticket categories ordered by price
     * @return List<TicketCategory>: All categories sorted by price (ascending)
     */
    public List<TicketCategory> getAllTicketCategories() {
        return ticketCategoryRepository.findAllByOrderByPriceAsc();
    }
    
    /**
     * Get ticket category by name
     * @param name - String: "child", "senior", or "adult"
     * @return Optional<TicketCategory>: Category if found, empty if not
     */
    public Optional<TicketCategory> getTicketCategoryByName(String name) {
        return ticketCategoryRepository.findByName(name);
    }
    
    /**
     * Create a new ticket category (admin only)
     * @param ticketCategory - TicketCategory: Category object with name and price
     * @return TicketCategory: Created category with generated ID and timestamps
     */
    public TicketCategory createTicketCategory(TicketCategory ticketCategory) {
        return ticketCategoryRepository.save(ticketCategory);
    }
    
    /**
     * Update ticket category pricing (admin only)
     * @param ticketCategory - TicketCategory: Category object with ID and updated price
     * @return TicketCategory: Updated category
     */
    public TicketCategory updateTicketCategory(TicketCategory ticketCategory) {
        return ticketCategoryRepository.save(ticketCategory);
    }
    
    /**
     * Delete a ticket category (admin only)
     * @param ticketCategoryId - Long: Category ID to delete
     */
    public void deleteTicketCategory(Long ticketCategoryId) {
        ticketCategoryRepository.deleteById(ticketCategoryId);
    }
}

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
    
    public List<TicketCategory> getAllTicketCategories() {
        return ticketCategoryRepository.findAllByOrderByPriceAsc();
    }
    
    public Optional<TicketCategory> getTicketCategoryByName(String name) {
        return ticketCategoryRepository.findByName(name);
    }
    
    public TicketCategory createTicketCategory(TicketCategory ticketCategory) {
        return ticketCategoryRepository.save(ticketCategory);
    }
    
    public TicketCategory updateTicketCategory(TicketCategory ticketCategory) {
        return ticketCategoryRepository.save(ticketCategory);
    }
    
    public void deleteTicketCategory(Long ticketCategoryId) {
        ticketCategoryRepository.deleteById(ticketCategoryId);
    }
}

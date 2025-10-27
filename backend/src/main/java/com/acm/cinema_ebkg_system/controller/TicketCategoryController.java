package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.TicketCategory;
import com.acm.cinema_ebkg_system.service.TicketCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * Ticket Category Controller - REST API endpoints for ticket category management
 * 
 * Provides REST endpoints for ticket category operations including CRUD operations
 * and specialized queries for pricing and category management.
 */
@RestController
@RequestMapping("/api/ticket-categories")
@CrossOrigin(origins = "*")
public class TicketCategoryController {
    
    @Autowired
    private TicketCategoryService ticketCategoryService;
    
    /**
     * Get all ticket categories ordered by price
     * @return list of ticket categories ordered by price
     */
    @GetMapping
    public ResponseEntity<List<TicketCategory>> getAllTicketCategories() {
        List<TicketCategory> ticketCategories = ticketCategoryService.getAllTicketCategories();
        return ResponseEntity.ok(ticketCategories);
    }
    
    /**
     * Get ticket category by name
     * @param name the ticket category name ('child', 'senior', 'adult')
     * @return ticket category or 404 if not found
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<TicketCategory> getTicketCategoryByName(@PathVariable String name) {
        Optional<TicketCategory> ticketCategory = ticketCategoryService.getTicketCategoryByName(name);
        return ticketCategory.map(ResponseEntity::ok)
                           .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Create a new ticket category
     * @param ticketCategory the ticket category to create
     * @return the created ticket category
     */
    @PostMapping
    public ResponseEntity<TicketCategory> createTicketCategory(@RequestBody TicketCategory ticketCategory) {
        TicketCategory createdCategory = ticketCategoryService.createTicketCategory(ticketCategory);
        return ResponseEntity.ok(createdCategory);
    }
    
    /**
     * Update an existing ticket category
     * @param ticketCategoryId the ticket category ID
     * @param ticketCategory the ticket category data to update
     * @return the updated ticket category
     */
    @PutMapping("/{ticketCategoryId}")
    public ResponseEntity<TicketCategory> updateTicketCategory(
            @PathVariable Long ticketCategoryId, 
            @RequestBody TicketCategory ticketCategory) {
        ticketCategory.setId(ticketCategoryId);
        TicketCategory updatedCategory = ticketCategoryService.updateTicketCategory(ticketCategory);
        return ResponseEntity.ok(updatedCategory);
    }
    
    /**
     * Delete a ticket category
     * @param ticketCategoryId the ticket category ID to delete
     * @return success response
     */
    @DeleteMapping("/{ticketCategoryId}")
    public ResponseEntity<Void> deleteTicketCategory(@PathVariable Long ticketCategoryId) {
        ticketCategoryService.deleteTicketCategory(ticketCategoryId);
        return ResponseEntity.ok().build();
    }
}

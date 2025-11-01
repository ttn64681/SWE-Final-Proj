package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.TicketCategory;
import com.acm.cinema_ebkg_system.service.TicketCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * Ticket Category Controller
 */
@RestController
@RequestMapping("/api/ticket-categories")
public class TicketCategoryController {
    
    @Autowired // Spring automatically provides service instance (dependency injection)
    private TicketCategoryService ticketCategoryService;
    
    /**
     * GET /api/ticket-categories
     * Input: None
     * Returns: List<TicketCategory> - all categories ordered by price (ascending)
     */
    @GetMapping
    public List<TicketCategory> getAllTicketCategories() {
        return ticketCategoryService.getAllTicketCategories();
    }
    
    /**
     * GET /api/ticket-categories/name/{name}
     * Input: name (String: "child", "senior", or "adult") in URL path
     * Returns: 404 Not Found if not found, otherwise TicketCategory
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<TicketCategory> getTicketCategoryByName(@PathVariable String name) {
        Optional<TicketCategory> ticketCategory = ticketCategoryService.getTicketCategoryByName(name);
        return ticketCategory.map(ResponseEntity::ok)
                           .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * POST /api/ticket-categories (admin only)
     * Input: TicketCategory JSON body with {name, price}
     * Returns: TicketCategory - created category with ID and timestamps
     */
    @PostMapping
    public TicketCategory createTicketCategory(@RequestBody TicketCategory ticketCategory) {
        return ticketCategoryService.createTicketCategory(ticketCategory);
    }
    
    /**
     * PUT /api/ticket-categories/{ticketCategoryId} (admin only)
     * Input: ticketCategoryId (Long) in URL path, TicketCategory JSON body with updated price
     * Returns: TicketCategory - updated category
     */
    @PutMapping("/{ticketCategoryId}")
    public TicketCategory updateTicketCategory(
            @PathVariable Long ticketCategoryId, 
            @RequestBody TicketCategory ticketCategory) {
        ticketCategory.setId(ticketCategoryId);
        return ticketCategoryService.updateTicketCategory(ticketCategory);
    }
    
    /**
     * DELETE /api/ticket-categories/{ticketCategoryId} (admin only)
     * Input: ticketCategoryId (Long) in URL path
     * Returns: 200 OK - category deleted (no body)
     */
    @DeleteMapping("/{ticketCategoryId}")
    public ResponseEntity<Void> deleteTicketCategory(@PathVariable Long ticketCategoryId) {
        ticketCategoryService.deleteTicketCategory(ticketCategoryId);
        return ResponseEntity.ok().build();
    }
}

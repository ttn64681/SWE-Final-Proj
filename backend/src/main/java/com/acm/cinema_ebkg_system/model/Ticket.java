package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import com.acm.cinema_ebkg_system.enums.TicketType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Ticket Entity - Represents individual tickets for movie bookings
 * 
 * TODO: Uncomment when fully implementing the ticket system
 * This entity maps to the 'ticket' table in the database and contains
 * ticket information for a specific booking.
 * 
 * Key Features:
 * - Links to Booking (many tickets belong to one booking)
 * - Links to TicketCategory (ticket type and pricing)
 * - Associates with ShowSeats via TicketSeat junction table
 * - Tracks ticket price at time of purchase
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ticket")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
// TODO: Uncomment entire class when implementing the ticket system
public class Ticket {
    // TODO: Uncomment all fields when implementing the ticket system
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private Long id;
    
    // Many-to-one relationship with Booking
    // TODO: Uncomment when Booking model is fully implemented
    // Many tickets belong to one booking (one booking can have multiple tickets)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    @JsonIgnoreProperties({"tickets", "createdAt", "updatedAt"})
    private Booking booking;
    
    // Many-to-one relationship with TicketCategory
    // Many tickets belong to one ticket category (one category applies to many tickets)
    @Enumerated(EnumType.STRING)
    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "ticket_category_id", nullable = false)
    @Column(name = "ticket_category_id", nullable = false)
    @JsonIgnoreProperties({"tickets"})
    private TicketType ticketType;
    
    // Price at time of purchase (may differ from current category price)
    @Column(name = "price_at_purchase", nullable = false, precision = 8, scale = 2)
    private java.math.BigDecimal priceAtPurchase;
    
    // One-to-many relationship with TicketSeat (junction table)
    // One ticket can be associated with many seats via TicketSeat
    
    /*@OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"ticket"})
    private List<TicketSeat> ticketSeats;*/
    
    // Reference to booking ID (for future use when Booking is implemented)
    @Column(name = "booking_id", insertable = false, updatable = false)
    private Long bookingId;
    
    // Timestamp when record was created
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Timestamp when record was last updated
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

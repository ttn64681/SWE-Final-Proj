package com.acm.cinema_ebkg_system.model;

// import jakarta.persistence.*;
// import lombok.Data;
// import lombok.NoArgsConstructor;
// import lombok.AllArgsConstructor;
// import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
// import java.time.LocalDateTime;

/**
 * Ticket Seat Entity - Junction table linking tickets to show seats
 * 
 * TODO: Uncomment when fully implementing the ticket system
 * This entity maps to the 'ticket_seat' table in the database and creates
 * a many-to-many relationship between tickets and show seats.
 * 
 * Key Features:
 * - Links individual tickets to specific seats in a show
 * - Prevents duplicate seat reservations (unique constraint on ticket_id, show_seat_id)
 * - Cascade delete when ticket or seat is deleted
 * - Tracks when the association was created
 */
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Entity
// @Table(name = "ticket_seat",
//        uniqueConstraints = @UniqueConstraint(
//            columnNames = {"ticket_id", "show_seat_id"}
//        ))
// @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
// TODO: Uncomment entire class when implementing the ticket system
public class TicketSeat {
    // TODO: Uncomment all fields when implementing the ticket system
    
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;
    
    // Many-to-one relationship with Ticket
    // Many ticket-seat associations belong to one ticket
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "ticket_id", nullable = false, referencedColumnName = "ticket_id")
    // @JsonIgnoreProperties({"ticketSeats", "createdAt", "updatedAt"})
    // private Ticket ticket;
    
    // Many-to-one relationship with ShowSeat
    // Many ticket-seat associations can reference one seat (multiple bookings for same seat)
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "show_seat_id", nullable = false)
    // @JsonIgnoreProperties({"ticketSeats", "createdAt", "updatedAt"})
    // private ShowSeat showSeat;
    
    // Timestamp when record was created
    // @Column(name = "created_at")
    // private LocalDateTime createdAt;
    
    // Timestamp when record was last updated
    // @Column(name = "updated_at")
    // private LocalDateTime updatedAt;
    
    // @PrePersist
    // protected void onCreate() {
    //     createdAt = LocalDateTime.now();
    //     updatedAt = LocalDateTime.now();
    // }
    
    // @PreUpdate
    // protected void onUpdate() {
    //     updatedAt = LocalDateTime.now();
    // }
}


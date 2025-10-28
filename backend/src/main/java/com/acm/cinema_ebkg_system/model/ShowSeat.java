package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;

/**
 * Show Seat Entity - Represents individual seats for each movie show
 * 
 * This entity maps to the 'show_seats' table in the database and contains
 * information about individual seats within a movie showing.
 * 
 * Key Features:
 * - Each seat belongs to a specific movie show
 * - Tracks seat availability (is_available)
 * - Records seat position (row and number)
 * - Cascade delete when show is deleted
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "show_seats", 
       uniqueConstraints = @UniqueConstraint(
           columnNames = {"show_id", "seat_row", "seat_number"}
       ))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ShowSeat {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Many-to-one relationship with MovieShow
    // Many seats belong to one show (one show has many seats)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "show_id", nullable = false, referencedColumnName = "id")
    @JsonIgnoreProperties({"seats", "movie", "showRoom", "createdAt", "updatedAt"})
    private MovieShow movieShow;
    
    // Seat row identifier (e.g., "A", "B", "1", "2")
    @Column(name = "seat_row", nullable = false, length = 10)
    private String seatRow;
    
    // Seat number within the row
    @Column(name = "seat_number", nullable = false, length = 10)
    private String seatNumber;
    
    // Availability status
    @Column(name = "is_reserved", nullable = false)
    private Boolean isReserved = false;
    
    // One-to-many relationship with TicketSeat
    // TODO: Uncomment when TicketSeat model is fully implemented
    // One seat can be associated with many ticket-seat entries
    // @OneToMany(mappedBy = "showSeat", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // @JsonIgnoreProperties({"showSeat"})
    // private java.util.List<TicketSeat> ticketSeats;
    
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


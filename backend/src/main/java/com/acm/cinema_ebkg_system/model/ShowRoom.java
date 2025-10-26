package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Show Room Entity - Represents cinema auditoriums/screening rooms in the cinema booking system
 * 
 * This entity maps to the 'show_room' table in the database and contains
 * auditorium information including name and seating capacity.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "show_room")
public class ShowRoom {
    // Primary key - auto-generated unique identifier
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Auditorium name (e.g., "Auditorium 1", "IMAX Theater")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    // Seating capacity
    @Column(name = "capacity", nullable = false)
    private Integer capacity;

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

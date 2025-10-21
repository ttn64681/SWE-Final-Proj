package com.acm.cinema_ebkg_system.model;

// JPA annotations to map this class to the show_dates table
import jakarta.persistence.Column;           // maps a field to a specific column          
import jakarta.persistence.Entity;           // marks this class as a DB entity
import jakarta.persistence.GeneratedValue;   // auto-generate PK values
import jakarta.persistence.GenerationType;   // strategy for PK generation
import jakarta.persistence.Id;               // marks primary key field
import jakarta.persistence.Table;            // maps to a specific table name

// Java time types used by columns
import java.time.LocalDate; // (YYYY-MM-DD)
import java.time.LocalDateTime; // date + time (timestamp)

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "movie_shows")
public class MovieShow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieShowID;

    @Column(name = "movie_id", nullable = false)
    private Long movieID;

    @Column(name = "show_room_id", nullable = false)
    private LocalDate showRoomID;

    // Default constructor
    public MovieShow() {}
}



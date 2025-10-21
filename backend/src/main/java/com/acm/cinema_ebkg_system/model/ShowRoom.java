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
@Table(name = "show_rooms")
public class ShowRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long show_room_id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    // Default constructor
    public ShowRoom() {}
}



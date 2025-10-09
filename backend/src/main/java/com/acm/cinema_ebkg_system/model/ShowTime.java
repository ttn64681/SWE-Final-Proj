package com.acm.cinema_ebkg_system.model;

// JPA annotations to map this class to the show_times table
import jakarta.persistence.Column;           // maps a field to a specific column
import jakarta.persistence.Entity;           // marks this class as a DB entity
import jakarta.persistence.GeneratedValue;   // auto-generate PK values
import jakarta.persistence.GenerationType;   // strategy for PK generation
import jakarta.persistence.Id;               // marks primary key field
import jakarta.persistence.Table;            // maps to a specific table name

// Java time types used by columns
import java.time.LocalDateTime;             
import java.time.LocalTime;                

// Lombok = auto-generate boilerplate (getters/setters/constructors)
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                    // Lombok: auto-generates getters, setters, toString, equals, hashCode (replaces @Getter @Setter)
@NoArgsConstructor      // Lombok: generates default constructor (required by JPA)
@Entity
@Table(name = "show_times")
public class ShowTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long show_time_id;

    @Column(name = "show_date_id", nullable = false)
    private Long show_date_id;

    @Column(name = "start_time", nullable = false)
    private LocalTime start_time;

    @Column(name = "end_time", nullable = false)
    private LocalTime end_time;

    @Column(name = "created_at")
    private LocalDateTime created_at;
}



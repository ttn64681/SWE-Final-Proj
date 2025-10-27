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

@Entity
@Table(name = "show_date")
public class ShowDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long show_date_id;

    @Column(name = "movie_id", nullable = false)
    private Long movie_id;

    @Column(name = "movie_show_id")
    private Long movie_show_id;

    @Column(name = "show_date", nullable = false)
    private LocalDate show_date;

    @Column(name = "created_at")
    private LocalDateTime created_at;

    // Default constructor
    public ShowDate() {}

    // Getters
    public Long getShow_date_id() { return show_date_id; }
    public Long getMovie_id() { return movie_id; }
    public Long getMovie_show_id() { return movie_show_id; }
    public LocalDate getShow_date() { return show_date; }
    public LocalDateTime getCreated_at() { return created_at; }

    // Setters
    public void setShow_date_id(Long show_date_id) { this.show_date_id = show_date_id; }
    public void setMovie_id(Long movie_id) { this.movie_id = movie_id; }
    public void setMovie_show_id(Long movie_show_id) { this.movie_show_id = movie_show_id; }
    public void setShow_date(LocalDate show_date) { this.show_date = show_date; }
    public void setCreated_at(LocalDateTime created_at) { this.created_at = created_at; }
}



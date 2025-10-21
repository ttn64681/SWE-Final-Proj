package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "movie_types")
public class MovieType {
    @Id // identifies below 'movie_id' as primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // generates unique val for primary key
    private Long id;
    @NotBlank
    @Column(nullable = false)
    private MovieType status; // Must be 'NOW_PLAYING' or 'UPCOMING'
    

    // Default constructor
    public MovieType() {}
}
package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 * DB Fields: 
 * id, 
 * title, 
 * status, 
 * genres, 
 * rating, 
 * release_date, 
 * synopsis, 
 * trailer_link, 
 * poster_link, 
 * cast_names, 
 * directors, 
 * producers
 */

 enum MovieType {
    NOW_PLAYING,
    UPCOMING
}

@Data
@Entity
@Table(name = "movie")
public class Movie {
    @Id // identifies below 'movie_id' as primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // generates unique val for primary key
    private Long id;
    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String title;
    @NotBlank
    @Column(nullable = false)
    private MovieType status; // Must be 'NOW_PLAYING' or 'UPCOMING'
    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String genres;
    @NotBlank
    @Column(nullable = false)
    private String rating; // Must be 'G', 'PG', 'PG-13', 'R', or 'NC-17'
    @NotNull
    @Column(nullable = false)
    private LocalDate releaseDate;
    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String synopsis;
    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String trailerLink;
    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String posterLink;
    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String castNames; // comma-separated names for simplicity
    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String directors; // comma-separated names
    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String producers; // comma-separated names

    // Default constructor
    public Movie() {}
}
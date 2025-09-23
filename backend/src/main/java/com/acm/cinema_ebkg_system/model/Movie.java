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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "movies")
public class Movie {
    @Id // identifies below 'id' as primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // generates unique val for primary key
    private Long id;
    @NotBlank
    @Column(nullable = false)
    private String title;
    @NotBlank
    @Column(nullable = false)
    private String status;
    @NotBlank
    @Column(nullable = false)
    private String genre;
    @NotBlank
    @Column(nullable = false)
    private String rating;
    @NotNull
    @Column(nullable = false)
    private LocalDate releaseDate;
    @NotBlank
    @Column(nullable = false)
    private String synopsis;
    @NotBlank
    @Column(nullable = false)
    private String trailerLink;
    @NotBlank
    @Column(nullable = false)
    private String posterLink;
    @NotBlank
    @Column(nullable = false)
    private String castNames; // comma-separated names for simplicity
    @NotBlank
    @Column(nullable = false)
    private String directors; // comma-separated names
    @NotBlank
    @Column(nullable = false)
    private String producers; // comma-separated names
}
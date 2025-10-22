package com.acm.cinema_ebkg_system.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "show_date")
public class ShowDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "show_date", nullable = false)
    private LocalDate showDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "movie_show_id")
    private MovieShow show;

    // Default constructor
    public ShowDate() {}
}



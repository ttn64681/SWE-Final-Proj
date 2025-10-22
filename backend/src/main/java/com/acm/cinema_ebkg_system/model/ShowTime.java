package com.acm.cinema_ebkg_system.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

// Java time types used by columns
import java.time.LocalDateTime;             
import java.time.LocalTime;       

@Data
@Entity
@Table(name = "show_time")
public class ShowTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "show_date_id", nullable = false)
    private Long showDateId;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "movie_show_id")
    private MovieShow show;

    // Default constructor
    public ShowTime() {}
}



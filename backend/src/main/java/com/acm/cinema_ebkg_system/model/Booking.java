package com.acm.cinema_ebkg_system.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = false)
    private Long paymentId;

    @OneToOne
    @JoinColumn(name = "movie_show_id", nullable = false)
    private Long movieShowId;

    @OneToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Long movieId;

    @OneToOne
    @JoinColumn(name = "promotion_id", nullable = false)
    private Long promotionId;

    // Default constructor
    public Booking() {}
}



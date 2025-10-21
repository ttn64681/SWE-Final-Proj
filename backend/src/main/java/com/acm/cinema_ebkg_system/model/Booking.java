package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;    

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingID;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Long userID;

    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = false)
    private Long paymentID;

    @OneToOne
    @JoinColumn(name = "movie_show_id", nullable = false)
    private Long movieShowID;

    @OneToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Long movieID;

    @OneToOne
    @JoinColumn(name = "promotion_id", nullable = false)
    private Long promotionID;

    // Default constructor
    public Booking() {}
}



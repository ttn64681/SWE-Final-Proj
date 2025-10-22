package com.acm.cinema_ebkg_system.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = false)
    @JsonBackReference
    private PaymentCard paymentCard;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonManagedReference
    private MovieShow movieShow;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "promotion_id", nullable = false)
    @JsonBackReference
    private Promotion promotion;

    // Default constructor
    public Booking() {}
}



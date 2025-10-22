package com.acm.cinema_ebkg_system.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="booking_id")
    private Long bookingId;

    @OneToMany
    @JoinColumn(name="movie_show_id")
    private Long movieShowId;

    @OneToOne
    @JoinColumn(name="show_seat_id")
    private Long showSeatId;

    @Column(name="type")
    private TicketType type;

    // Default constructor
    public Ticket() {}
}



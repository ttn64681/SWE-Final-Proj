package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;         

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketID;

    @ManyToOne
    @JoinColumn(name="booking_id")
    private Long bookingID;

    @OneToMany
    @JoinColumn(name="movie_show_id")
    private Long movieShowID;

    @OneToOne
    @JoinColumn(name="show_seat_id")
    private Long showSeatID;

    @Column(name="type")
    private TicketType type;

    // Default constructor
    public Ticket() {}
}



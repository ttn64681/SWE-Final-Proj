package com.acm.cinema_ebkg_system.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    @JsonBackReference
    private Booking booking;

    @ManyToOne
    @JoinColumn(name="movie_show_id")
    @JsonBackReference
    private MovieShow show;

    @OneToOne(mappedBy = "ticket", cascade = CascadeType.ALL)
    @JsonManagedReference
    private ShowSeat seat;

    @Column(name="type")
    private TicketType type;

    // Default constructor
    public Ticket() {}
}



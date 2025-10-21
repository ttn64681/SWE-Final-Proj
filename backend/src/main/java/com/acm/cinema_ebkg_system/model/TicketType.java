package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;         

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "ticket_types")
public class TicketType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketTypeID;

    @Column(name="type")
    private String type;

     @Column(name="price")
    private String price;

    // Default constructor
    public TicketType() {}
}



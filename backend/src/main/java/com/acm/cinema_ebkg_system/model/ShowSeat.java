package com.acm.cinema_ebkg_system.model;

// JPA annotations to map this class to the show_dates table
import jakarta.persistence.*;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "show_seats")
public class ShowSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long showSeatID;

    // Default constructor
    public ShowSeat() {}
}



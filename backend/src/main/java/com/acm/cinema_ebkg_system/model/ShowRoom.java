package com.acm.cinema_ebkg_system.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@Table(name = "show_room")
public class ShowRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "num_seats", nullable = false)
    private int capacity;

    @OneToMany(mappedBy = "show_room", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<MovieShow> movieShows = new ArrayList<>();

    @OneToMany(mappedBy = "show_room", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ShowSeat> seats = new ArrayList<>();

    // Default constructor
    public ShowRoom() {}
}



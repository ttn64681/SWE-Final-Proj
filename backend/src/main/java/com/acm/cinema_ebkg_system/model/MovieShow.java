package com.acm.cinema_ebkg_system.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@Table(name = "movie_show")
public class MovieShow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    @JsonBackReference
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "show_room_id", nullable = false)
    @JsonBackReference
    private ShowRoom room;

    @OneToOne(mappedBy = "movie_show", cascade = CascadeType.ALL)
    @JsonManagedReference
    private ShowDate date;

    @OneToOne(mappedBy = "movie_show", cascade = CascadeType.ALL)
    @JsonManagedReference
    private ShowTime time;

    // Default constructor
    public MovieShow() {}
}



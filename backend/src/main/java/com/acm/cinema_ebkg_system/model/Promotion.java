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
@Table
@Entity
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "promo_code")
    private String promoCode;

    @Column(name = "discount")
    private String discount;

    @Column(name = "description")
    private String description;

    @Column(name = "image_link")
    private String imageLink;

    @OneToMany(mappedBy = "promotion", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Booking> bookings = new ArrayList<>();

    public Promotion() {}

}

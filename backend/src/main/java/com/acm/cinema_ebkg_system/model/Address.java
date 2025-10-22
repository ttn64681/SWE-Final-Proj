package com.acm.cinema_ebkg_system.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@Table(name = "address")
public class Address {
    // Primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User ID - Foreign key
    @OneToOne
    @JoinColumn(name="user_id")
    private Long userId;

    @Column(name="street")
    private String street;

    @Column(name="state")
    private String state;

    @Column(name="country")
    private String country;

    @Column(name="zip")
    private String zip;

    // Type: Home or billing
    @Column(name="type")
    private String addressType;

    // ========== CONSTRUCTORS ==========

    public Address() {}

}

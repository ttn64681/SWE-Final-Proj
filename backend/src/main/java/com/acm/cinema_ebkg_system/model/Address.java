package com.acm.cinema_ebkg_system.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

enum AddressType {
    HOME,
    BILLING
}
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
    @JsonBackReference
    private User user;

    @Column(name="street")
    private String street;

    @Column(name="state")
    private String state;

    @Column(name="country")
    private String country;

    @Column(name="zip")
    private String zip;

    // Type: Home or billing
    @Column(name="type", nullable=false)
    private AddressType addressType;

    // ========== CONSTRUCTORS ==========

    public Address() {}

    // Custom constructor for updating address info
    public Address(String street, String state, String country, String zip) {
        this.street = street;
        this.state = state;
        this.country = country;
        this.zip = zip;
    }
}

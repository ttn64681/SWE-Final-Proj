// package com.acm.cinema_ebkg_system.model;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToMany;
// import jakarta.persistence.Table;
// import jakarta.validation.constraints.NotBlank;
// import lombok.Data;
// import lombok.NoArgsConstructor;


// @Data
// @NoArgsConstructor
// @Entity
// @Table(name = "promotions")
// public class Promotion {   

//     @Id // identifies below 'movie_id' as primary key
//     @GeneratedValue(strategy = GenerationType.IDENTITY) // generates unique val for primary key
//     private Long promotion_id;

//     @NotBlank
//     @Column(nullable = false)
//     private String promo_code;
    
//     @OneToMany
//     @JoinColumn(name = "booking_id", nullable = true)
//     private Booking booking;

// }
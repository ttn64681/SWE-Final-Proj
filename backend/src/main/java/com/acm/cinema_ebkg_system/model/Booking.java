// package com.acm.cinema_ebkg_system.model;

// import com.fasterxml.jackson.annotation.JsonBackReference;

// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.OneToOne;
// import jakarta.persistence.Table;
// import jakarta.validation.constraints.NotNull;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @NoArgsConstructor
// @Entity
// @Table(name = "bookings")
// public class Booking {

//     @Id // identifies below 'movie_id' as primary key
//     @GeneratedValue(strategy = GenerationType.IDENTITY) // generates unique val for primary key
//     private Long booking_id;

//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "user_id", nullable = false)
//     @JsonBackReference
//     private User user;

//     @OneToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "payment_info_id", nullable = false)
//     private PaymentInfo paymentInfo;

//     // @OneToMany
//     // @JoinColumn(name = "")

//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "promotions_id", nullable = true)
//     private Promotion promotion;

//     @NotNull    
//     // @Column(nullable = false)
//     private Integer tickets;


// }

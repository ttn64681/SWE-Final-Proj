package com.acm.cinema_ebkg_system.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

enum PaymentCardType {
    MASTERCARD,
    AMERICAN_EXPRESS,
    VISA
}

@Data
@NoArgsConstructor
@Entity
@Table(name = "payment_card")
public class PaymentCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long cardNumber;

    @Column(nullable = false)
    private LocalDate expirationDate;

    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = false)
    private Boolean defaultPayment;

    @Column(nullable = false)
    private PaymentCardType cardType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", nullable = false)
    @JsonBackReference
    private Address billingAddress;
}

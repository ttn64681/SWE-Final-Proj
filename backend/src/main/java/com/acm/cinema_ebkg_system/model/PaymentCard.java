package com.acm.cinema_ebkg_system.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

enum PaymentCardType {
    MASTERCARD,
    AMERICAN_EXPRESS,
    VISA
}

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "payment_card")
public class PaymentCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payment_info_id;

    @NotNull
    @Column(nullable = false)
    private Long card_number;

    @NotNull
    @Column(nullable = false)
    private LocalDate expiration_date;

    @NotNull
    @Column(nullable = false)
    private String cardholderName;

    @NotNull
    @Column(nullable = false)
    private Boolean defaultPayment;

    @NotNull
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

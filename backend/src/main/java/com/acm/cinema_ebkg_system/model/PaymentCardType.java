package com.acm.cinema_ebkg_system.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "payment_card_type")
public class PaymentCardType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentCardTypeID;

    @Column(nullable = false)
    private String type;
}

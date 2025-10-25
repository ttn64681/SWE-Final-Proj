package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Payment Card Entity - Represents user payment cards in the cinema booking system
 * 
 * This entity maps to the 'payment_card' table in the database and contains
 * payment card information with associated billing addresses.
 * 
 * Key Features:
 * - JPA Entity with automatic table creation
 * - Support for multiple payment card types (Visa, Mastercard, Amex, Discover)
 * - One-to-one relationship with billing address
 * - Automatic timestamp management for created_at and updated_at
 * - Default card designation support
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment_card")
public class PaymentCard {
    // Primary key - auto-generated unique identifier
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign key to users table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // One-to-one relationship with billing address
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    // Encrypted card number
    @Column(name = "card_number", nullable = false, length = 19)
    private String cardNumber;

    // Cardholder name
    @Column(name = "cardholder_name", nullable = false, length = 100)
    private String cardholderName;

    // Payment card type: 'visa', 'mastercard', 'amex', 'discover'
    @Column(name = "payment_card_type", nullable = false)
    private String paymentCardType;

    // Whether this is the default payment card
    @Column(name = "is_default")
    private Boolean isDefault = false;

    // Card expiration date in MM/YYYY format
    @Column(name = "expiration_date", nullable = false, length = 7)
    private String expirationDate;

    // Encrypted CVV
    @Column(name = "cvv", nullable = false, length = 4)
    private String cvv;

    // Timestamp when record was created
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Timestamp when record was last updated
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

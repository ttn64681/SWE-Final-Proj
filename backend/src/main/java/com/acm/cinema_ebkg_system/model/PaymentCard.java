package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PaymentCard {
    // Primary key - auto-generated unique identifier
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign key to user table
    // Many payment cards belong to one user (a user can have up to 3 payment cards)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    // Foreign key to address table
    // Each payment card has exactly one billing address (1-to-1 relationship)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", nullable = false)
    @JsonIgnore
    private Address address;
    
    // Expose address_id for frontend use
    @Column(name = "address_id", insertable = false, updatable = false)
    private Long addressId;

    // Encrypted card number
    @Column(name = "card_number", nullable = false, length = 19)
    private String cardNumber;

    // Cardholder name
    @Column(name = "cardholder_name", nullable = false, length = 100)
    private String cardholderName;

    // Payment card type: 'visa', 'mastercard', 'amex', 'discover'
    @Column(name = "payment_card_type", nullable = false)
    private String paymentCardType;


    @Column(name = "is_default")
    private Boolean isDefault = false;

    // Card expiration date in MM/YYYY format
    @Column(name = "expiration_date", nullable = false, length = 7)
    private String expirationDate;

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

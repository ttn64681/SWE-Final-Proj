package com.acm.cinema_ebkg_system.model;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.ArrayList;

/**
 * User Entity - Represents a user in the cinema booking system
 * 
 * This entity maps to the 'users' table in the database and contains all user information
 * including authentication credentials and personal details collected during registration.
 * 
 * Key Features:
 * - JPA Entity with automatic table creation
 * - Password hashing handled at service layer (not stored as plain text)
 * - Automatic timestamp management for created_at and updated_at
 * - Email uniqueness constraint for login purposes
 * 
 * @author ACM Cinema Team
 * @version 1.0
 */
@Data 
@Entity
@Table(name = "users")
public class User {
    // Primary key - auto-generated unique identifier
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Email address - used as username for login, must be unique
    @Column(name="email", nullable = false, unique = true)
    private String email;

    // Password - stored as BCrypt hash (never plain text)
    @Column(name="password", nullable = false)
    private String password;

    // Required personal information
    @Column(name="first_name", nullable = false)
    private String firstName;

    @Column(name="last_name", nullable = false)
    private String lastName;

    // Optional contact information
    @Column(name = "phone_number")
    private String phoneNumber;

    // Optional address information (collected during registration)
    @OneToOne
    @JoinColumn(name = "address_id")
    private Long addressID;

    // Audit fields - automatically managed timestamps
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ========== EMAIL VERIFICATION FIELDS ==========
    
    @Column(name = "status", nullable = false)
    private UserStatus status;

    @Column(name = "verification_token")
    private String verificationToken;
    
    @Column(name = "verification_token_expires_at")
    private LocalDateTime verificationTokenExpiresAt;

    // ========== PASSWORD RESET FIELDS ==========
    
    @Column(name = "password_reset_token")
    private String passwordResetToken;
    
    @Column(name = "password_reset_token_expires_at")
    private LocalDateTime passwordResetTokenExpiresAt;

    // ADD
    // @Column(name = "profile_image_link")
    // private String profileImageLink;

    // ADD
    // @Column(name = "enrolled_for_promotions")
    // private Boolean enrolledForPromotions;

    // ========== CONSTRUCTORS ==========
    
    /**
     * Default constructor required by JPA
     */
    public User() {}

    /**
     * Constructor for creating a new user with basic required information
     * Automatically sets creation and update timestamps
     * 
     * @param email User's email address (used for login)
     * @param password User's password (will be hashed before saving)
     * @param firstName User's first name
     * @param lastName User's last name
     */
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PaymentCard> paymentInfos = new ArrayList<>();

    // Custom constructor for registration (kept for business logic)
public User(String email, String password, String firstName, String lastName, UserStatus status) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = status;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // ========== JPA LIFECYCLE CALLBACKS ==========
    
    /**
     * JPA callback method - automatically called before saving a new entity
     * Sets the creation and update timestamps
     */
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    /**
     * JPA callback method - automatically called before updating an existing entity
     * Updates the modification timestamp
     */
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

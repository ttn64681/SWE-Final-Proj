package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.acm.cinema_ebkg_system.enums.PaymentCardType;
import com.acm.cinema_ebkg_system.enums.UserStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

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
 */

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    // Primary key - auto-generated unique identifier
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Email address - used as username for login, must be unique
    @Column(nullable = false, unique = true)
    private String email;

    // Password - stored as BCrypt hash (never plain text)
    @Column(nullable = false)
    private String password;

    // Required personal information
    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    // Optional contact information
    @Column
    private String phoneNumber;

    // User preferences
    @Column(name = "enrolled_for_promotions")
    private boolean enrolledForPromotions = false;

    // Audit fields - automatically managed timestamps
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ========== EMAIL VERIFICATION FIELDS ==========
    
    @Column(name = "is_active")
    private boolean isActive = false;

  /*@Enumerated(EnumType.STRING)
    @Column(name = "user_status", nullable = false)
    private UserStatus userStatus; */
    
    @Column(name = "verification_token")
    private String verificationToken;
    
    @Column(name = "verification_token_expires_at")
    private LocalDateTime verificationTokenExpiresAt;

    // ========== PASSWORD RESET FIELDS ==========
    
    @Column(name = "password_reset_token")
    private String passwordResetToken;
    
    @Column(name = "password_reset_token_expires_at")
    private LocalDateTime passwordResetTokenExpiresAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PaymentInfo> paymentInfos = new ArrayList<>();
    
    // One-to-many relationship with Address
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Address> addresses = new ArrayList<>();

    // ========== CUSTOM CONSTRUCTORS ==========
    
    /**
     * Constructor for creating a new user with basic required information
     * Automatically sets creation and update timestamps
     * 
     * @param email User's email address (used for login)
     * @param password User's password (will be hashed before saving)
     * @param firstName User's first name
     * @param lastName User's last name
     */
    public User(String email, String password, String firstName, String lastName, PaymentInfo paymentInfo) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.paymentInfos.add(paymentInfo);
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
    
    // ========== HOME ADDRESS GETTERS (for JSON serialization) ==========
    
    /**
     * Get home address street
     * Returns the street from the home address if it exists
     */
    public String getHomeStreet() {
        if (addresses != null) {
            return addresses.stream()
                .filter(addr -> "home".equals(addr.getAddressType()))
                .findFirst()
                .map(Address::getStreet)
                .orElse(null);
        }
        return null;
    }
    
    /**
     * Get home address city
     */
    public String getHomeCity() {
        if (addresses != null) {
            return addresses.stream()
                .filter(addr -> "home".equals(addr.getAddressType()))
                .findFirst()
                .map(Address::getCity)
                .orElse(null);
        }
        return null;
    }
    
    /**
     * Get home address state
     */
    public String getHomeState() {
        if (addresses != null) {
            return addresses.stream()
                .filter(addr -> "home".equals(addr.getAddressType()))
                .findFirst()
                .map(Address::getState)
                .orElse(null);
        }
        return null;
    }
    
    /**
     * Get home address ZIP code
     */
    public String getHomeZip() {
        if (addresses != null) {
            return addresses.stream()
                .filter(addr -> "home".equals(addr.getAddressType()))
                .findFirst()
                .map(Address::getZip)
                .orElse(null);
        }
        return null;
    }
    
    /**
     * Get home address country
     */
    public String getHomeCountry() {
        if (addresses != null) {
            return addresses.stream()
                .filter(addr -> "home".equals(addr.getAddressType()))
                .findFirst()
                .map(Address::getCountry)
                .orElse(null);
        }
        return null;
    }
    
    // ========== HOME ADDRESS SETTERS (for frontend updates) ==========
    
    /**
     * Set home address street
     * Note: This is a convenience method for DTOs. Actual update should be done via AddressService
     */
    public void setHomeStreet(String street) {
        if (addresses != null) {
            addresses.stream()
                .filter(addr -> "home".equals(addr.getAddressType()))
                .findFirst()
                .ifPresent(addr -> addr.setStreet(street));
        }
    }
    
    /**
     * Set home address city
     */
    public void setHomeCity(String city) {
        if (addresses != null) {
            addresses.stream()
                .filter(addr -> "home".equals(addr.getAddressType()))
                .findFirst()
                .ifPresent(addr -> addr.setCity(city));
        }
    }
    
    /**
     * Set home address state
     */
    public void setHomeState(String state) {
        if (addresses != null) {
            addresses.stream()
                .filter(addr -> "home".equals(addr.getAddressType()))
                .findFirst()
                .ifPresent(addr -> addr.setState(state));
        }
    }
    
    /**
     * Set home address ZIP code
     */
    public void setHomeZip(String zip) {
        if (addresses != null) {
            addresses.stream()
                .filter(addr -> "home".equals(addr.getAddressType()))
                .findFirst()
                .ifPresent(addr -> addr.setZip(zip));
        }
    }
    
    /**
     * Set home address country
     */
    public void setHomeCountry(String country) {
        if (addresses != null) {
            addresses.stream()
                .filter(addr -> "home".equals(addr.getAddressType()))
                .findFirst()
                .ifPresent(addr -> addr.setCountry(country));
        }
    }
}

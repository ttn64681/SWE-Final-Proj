package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Admin Entity - Represents an admin user in the cinema booking system
 * 
 * This entity maps to the existing 'admin' table in the database and contains
 * admin authentication credentials and profile information.
 * 
 * Key Features:
 * - JPA Entity mapping to existing admin table
 * - Password hashing handled at service layer (not stored as plain text)
 * - Email uniqueness constraint for login purposes
 * - Profile image support
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "admin")
public class Admin {
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

    // Profile image link (optional)
    @Column(name = "profile_image_link")
    private String profileImageLink;

    // Timestamp fields for audit trail
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Constructor for creating a new admin with basic required information
     * 
     * @param email Admin's email address (used for login)
     * @param password Admin's password (will be hashed before saving)
     */
    public Admin(String email, String password) {
        this.email = email;
        this.password = password;
    }

    /**
     * Constructor for creating a new admin with profile image
     * 
     * @param email Admin's email address (used for login)
     * @param password Admin's password (will be hashed before saving)
     * @param profileImageLink Admin's profile image URL
     */
    public Admin(String email, String password, String profileImageLink) {
        this.email = email;
        this.password = password;
        this.profileImageLink = profileImageLink;
    }

    // ========== JPA LIFECYCLE CALLBACKS ==========
    
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}

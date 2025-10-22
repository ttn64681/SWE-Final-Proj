package com.acm.cinema_ebkg_system.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

/**
 * Admin Entity - Represents an admin in the cinema booking system
 * 
 * This entity maps to the 'admins' table in the database and contains the admin's ID and login credentials.
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
@Table(name = "admin")
public class Admin {
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

    // Profile image link
    @Column(name="profle_image_link", nullable = false)
    private String profileImageLink;

    // ========== CONSTRUCTORS ==========
    
    /**
     * Default constructor required by JPA
     */
    public Admin() {}
}

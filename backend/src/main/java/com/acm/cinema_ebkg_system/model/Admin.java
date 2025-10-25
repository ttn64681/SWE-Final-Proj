package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;

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

    // ========== CONSTRUCTORS ==========
    
    /**
     * Default constructor required by JPA
     */
    public Admin() {}

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

    // ========== GETTERS AND SETTERS ==========
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getProfileImageLink() { return profileImageLink; }
    public void setProfileImageLink(String profileImageLink) { this.profileImageLink = profileImageLink; }
}

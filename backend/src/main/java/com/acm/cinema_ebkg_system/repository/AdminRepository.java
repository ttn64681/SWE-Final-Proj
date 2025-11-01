package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Admin Repository - Data access layer for Admin entities
 * 
 * This repository provides CRUD operations and custom query methods for Admin entities.
 * It extends JpaRepository to inherit standard database operations and provides
 * custom methods for admin-specific queries.
 * 
 * Key Features:
 * - Standard CRUD operations inherited from JpaRepository
 * - Custom query methods for admin authentication
 * - Email-based lookups for login operations
 * - Status-based filtering for active admins
 * 
 * @author ACM Cinema Team
 * @version 1.0
 */
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    /**
     * Find an admin by email address
     * 
     * @param email Admin's email address
     * @return Optional<Admin> containing the admin if found, empty otherwise
     */
    Optional<Admin> findByEmail(String email);
    
    /**
     * Check if an admin exists with the given email
     * 
     * @param email Admin's email address
     * @return boolean true if admin exists, false otherwise
     */
    boolean existsByEmail(String email);
    
}

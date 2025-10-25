package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Address Repository - Data access layer for Address entities
 * 
 * Provides CRUD operations and custom query methods for address management.
 * Supports finding addresses by user and type for efficient data retrieval.
 */
@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    
    /**
     * Find all addresses for a specific user
     * @param userId the user ID
     * @return list of addresses for the user
     */
    List<Address> findByUserId(Long userId);
    
    /**
     * Find addresses for a user by address type
     * @param userId the user ID
     * @param addressType the address type ('home' or 'billing')
     * @return list of addresses matching the criteria
     */
    List<Address> findByUserIdAndAddressType(Long userId, String addressType);
    
    
    /**
     * Find all addresses by address type
     * @param addressType the address type ('home' or 'billing')
     * @return list of addresses matching the type
     */
    List<Address> findByAddressType(String addressType);
}

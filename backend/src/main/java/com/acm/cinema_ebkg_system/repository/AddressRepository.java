package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Address Repository - Data access layer for Address entities
 * 
 * Automatically provides standard CRUD operations:
 * - save(), findById(), findAll(), deleteById(), count(), existsById()
 * 
 * Custom query methods based on property names:
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
}

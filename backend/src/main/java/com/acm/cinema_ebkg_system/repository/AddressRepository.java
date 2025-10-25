package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Address Repository
 * 
 * Automatically provides: save(), findById(), findAll(), deleteById(), count(), existsById()
 */
@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    
    List<Address> findByUserId(Long userId);
    List<Address> findByUserIdAndAddressType(Long userId, String addressType);
}

package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.Address;
import com.acm.cinema_ebkg_system.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Address Service - Business logic layer for address management
 * 
 * Provides business logic for address operations including CRUD operations
 * and specialized queries for home and billing addresses.
 */
@Service
public class AddressService {
    
    @Autowired
    private AddressRepository addressRepository;
    
    /**
     * Get all addresses for a specific user
     * @param userId the user ID
     * @return list of addresses for the user
     */
    public List<Address> getUserAddresses(Long userId) {
        return addressRepository.findByUserId(userId);
    }
    
    /**
     * Get addresses for a user by address type
     * @param userId the user ID
     * @param addressType the address type ('home' or 'billing')
     * @return list of addresses matching the criteria
     */
    public List<Address> getUserAddressesByType(Long userId, String addressType) {
        return addressRepository.findByUserIdAndAddressType(userId, addressType);
    }
    
    /**
     * Get user's home address
     * @param userId the user ID
     * @return optional home address
     */
    public Optional<Address> getUserHomeAddress(Long userId) {
        List<Address> homeAddresses = addressRepository.findByUserIdAndAddressType(userId, "home");
        return homeAddresses.isEmpty() ? Optional.empty() : Optional.of(homeAddresses.get(0));
    }
    
    /**
     * Get user's billing addresses
     * @param userId the user ID
     * @return list of billing addresses
     */
    public List<Address> getUserBillingAddresses(Long userId) {
        return addressRepository.findByUserIdAndAddressType(userId, "billing");
    }
    
    /**
     * Create a new address
     * @param address the address to create
     * @return the created address
     */
    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }
    
    /**
     * Update an existing address
     * @param address the address to update
     * @return the updated address
     */
    public Address updateAddress(Address address) {
        return addressRepository.save(address);
    }
    
    /**
     * Delete an address by ID
     * @param addressId the address ID to delete
     */
    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);
    }
}

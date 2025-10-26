package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.Address;
import com.acm.cinema_ebkg_system.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Address Service
 */
@Service
public class AddressService {
    
    @Autowired
    private AddressRepository addressRepository;
    
    /**
     * Get all addresses for a user
     * @param userId - Long: User ID
     * @return List<Address>: All addresses for the user
     */
    public List<Address> getUserAddresses(Long userId) {
        return addressRepository.findByUserId(userId);
    }
    
    /**
     * Get addresses for a user by type
     * @param userId - Long: User ID
     * @param addressType - String: "home" or "billing"
     * @return List<Address>: Addresses matching the type
     */
    public List<Address> getUserAddressesByType(Long userId, String addressType) {
        return addressRepository.findByUserIdAndAddressType(userId, addressType);
    }
    
    /**
     * Get user's home address
     * @param userId - Long: User ID
     * @return Optional<Address>: Home address if exists, empty if not
     */
    public Optional<Address> getUserHomeAddress(Long userId) {
        List<Address> homeAddresses = addressRepository.findByUserIdAndAddressType(userId, "home");
        return homeAddresses.isEmpty() ? Optional.empty() : Optional.of(homeAddresses.get(0));
    }
    
    /**
     * Get user's billing addresses
     * @param userId - Long: User ID
     * @return List<Address>: All billing addresses for the user
     */
    public List<Address> getUserBillingAddresses(Long userId) {
        return addressRepository.findByUserIdAndAddressType(userId, "billing");
    }
    
    /**
     * Create a new address
     * @param address - Address: Address object with user_id, address_type, street, city, state, zip, country
     * @return Address: Created address with generated ID and timestamps
     */
    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }
    
    /**
     * Update an existing address
     * @param address - Address: Address object with ID and updated fields
     * @return Address: Updated address
     */
    public Address updateAddress(Address address) {
        return addressRepository.save(address);
    }
    
    /**
     * Delete an address
     * @param addressId - Long: Address ID to delete
     */
    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);
    }
}

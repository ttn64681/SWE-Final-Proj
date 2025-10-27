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
    
    public List<Address> getUserAddresses(Long userId) {
        return addressRepository.findByUserId(userId);
    }
    
    public List<Address> getUserAddressesByType(Long userId, String addressType) {
        return addressRepository.findByUserIdAndAddressType(userId, addressType);
    }
    
    public Optional<Address> getUserHomeAddress(Long userId) {
        List<Address> homeAddresses = addressRepository.findByUserIdAndAddressType(userId, "home");
        return homeAddresses.isEmpty() ? Optional.empty() : Optional.of(homeAddresses.get(0));
    }
    
    public List<Address> getUserBillingAddresses(Long userId) {
        return addressRepository.findByUserIdAndAddressType(userId, "billing");
    }
    
    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }
    
    public Address updateAddress(Address address) {
        return addressRepository.save(address);
    }
    
    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);
    }
}

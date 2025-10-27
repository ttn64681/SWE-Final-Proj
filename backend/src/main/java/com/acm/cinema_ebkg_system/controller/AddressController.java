package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.Address;
import com.acm.cinema_ebkg_system.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * Address Controller - REST API endpoints for address management
 * 
 * Provides REST endpoints for address operations including CRUD operations
 * and specialized queries for home and billing addresses.
 */
@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = "*")
public class AddressController {
    
    @Autowired
    private AddressService addressService;
    
    /**
     * Get all addresses for a specific user
     * @param userId the user ID
     * @return list of addresses for the user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Address>> getUserAddresses(@PathVariable Long userId) {
        List<Address> addresses = addressService.getUserAddresses(userId);
        return ResponseEntity.ok(addresses);
    }
    
    /**
     * Get addresses for a user by address type
     * @param userId the user ID
     * @param addressType the address type ('home' or 'billing')
     * @return list of addresses matching the criteria
     */
    @GetMapping("/user/{userId}/type/{addressType}")
    public ResponseEntity<List<Address>> getUserAddressesByType(
            @PathVariable Long userId, 
            @PathVariable String addressType) {
        List<Address> addresses = addressService.getUserAddressesByType(userId, addressType);
        return ResponseEntity.ok(addresses);
    }
    
    /**
     * Get user's home address
     * @param userId the user ID
     * @return home address or 404 if not found
     */
    @GetMapping("/user/{userId}/home")
    public ResponseEntity<Address> getUserHomeAddress(@PathVariable Long userId) {
        Optional<Address> homeAddress = addressService.getUserHomeAddress(userId);
        return homeAddress.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Create a new address
     * @param address the address to create
     * @return the created address
     */
    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody Address address) {
        Address createdAddress = addressService.createAddress(address);
        return ResponseEntity.ok(createdAddress);
    }
    
    /**
     * Update an existing address
     * @param addressId the address ID
     * @param address the address data to update
     * @return the updated address
     */
    @PutMapping("/{addressId}")
    public ResponseEntity<Address> updateAddress(
            @PathVariable Long addressId, 
            @RequestBody Address address) {
        address.setId(addressId);
        Address updatedAddress = addressService.updateAddress(address);
        return ResponseEntity.ok(updatedAddress);
    }
    
    /**
     * Delete an address
     * @param addressId the address ID to delete
     * @return success response
     */
    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);
        return ResponseEntity.ok().build();
    }
}

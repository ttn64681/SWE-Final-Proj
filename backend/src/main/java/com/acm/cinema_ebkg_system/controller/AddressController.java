package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.Address;
import com.acm.cinema_ebkg_system.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * Address Controller
 */
@RestController
@RequestMapping("/api/address")
public class AddressController {
    
    @Autowired // Spring automatically provides service instance (dependency injection)
    private AddressService addressService;
    
    /**
     * GET /api/addresses/user/{userId}
     * Input: userId (Long) in URL path
     * Returns: List<Address> - all addresses for user
     */
    @GetMapping("/user/{userId}")
    public List<Address> getUserAddresses(@PathVariable Long userId) {
        return addressService.getUserAddresses(userId);
    }
    
    /**
     * GET /api/addresses/user/{userId}/type/{addressType}
     * Input: userId (Long), addressType (String: "home" or "billing") in URL path
     * Returns: List<Address> - addresses matching type
     */
    @GetMapping("/user/{userId}/type/{addressType}")
    public List<Address> getUserAddressesByType(
            @PathVariable Long userId, 
            @PathVariable String addressType) {
        return addressService.getUserAddressesByType(userId, addressType);
    }
    
    /**
     * GET /api/address/{addressId}
     * Input: addressId (Long) in URL path
     * Returns: Address - address by ID
     */
    @GetMapping("/{addressId}")
    public ResponseEntity<Address> getAddressById(@PathVariable Long addressId) {
        return addressService.getAddressById(addressId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * GET /api/addresses/user/{userId}/home
     * Input: userId (Long) in URL path
     * Returns: 404 Not Found if no home address, otherwise Address
     */
    @GetMapping("/user/{userId}/home")
    public ResponseEntity<Address> getUserHomeAddress(@PathVariable Long userId) {
        Optional<Address> homeAddress = addressService.getUserHomeAddress(userId);
        return homeAddress.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * POST /api/addresses
     * Input: Address JSON body with {user_id, address_type, street, city, state, zip, country}
     * Returns: Address - created address with ID and timestamps
     */
    @PostMapping
    public Address createAddress(@RequestBody Address address) {
        return addressService.createAddress(address);
    }
    
    /**
     * PUT /api/addresses/{addressId}
     * Input: addressId (Long) in URL path, Address JSON body with updated fields
     * Returns: Address - updated address
     */
    @PutMapping("/{addressId}")
    public Address updateAddress(
            @PathVariable Long addressId, 
            @RequestBody Address address) {
        address.setId(addressId);
        return addressService.updateAddress(address);
    }
    
    /**
     * DELETE /api/addresses/{addressId}
     * Input: addressId (Long) in URL path
     * Returns: 200 OK - address deleted (no body)
     */
    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);
        return ResponseEntity.ok().build();
    }
}

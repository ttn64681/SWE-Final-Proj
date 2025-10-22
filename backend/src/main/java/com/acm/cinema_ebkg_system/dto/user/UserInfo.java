package com.acm.cinema_ebkg_system.dto.user;

import com.acm.cinema_ebkg_system.model.Address;

public class UserInfo {
    private String email;
    private String currentPassword;
    private String newPassword;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String street;
    private String state;
    private String country;
    private String zip;
    private Address address;

    // Default constructor
    public UserInfo() {}

    // Constructor with all fields
    public UserInfo(String email, String currentPassword, String newPassword, String firstName, String lastName, 
                   String phoneNumber, String street, String state, String country, Address address) {
        this.email = email;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.street = street;
        this.state = state;
        this.country = country;
        this.address = new Address(street, state, country, zip);
    }

    // Getters
    public String getEmail() { return email; }
    public String getCurrentPassword() { return currentPassword; }
    public String getNewPassword() { return newPassword; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getStreet() { return street; }
    public String getState() { return state; }
    public String getCountry() { return country; }
    public Address getAddress() { return address; }

    // Setters
    public void setEmail(String email) { this.email = email; }
    public void setCurrentPassword(String currentPassword) { this.currentPassword = currentPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setStreet(String street) { this.street = street; }
    public void setState(String state) { this.state = state; }
    public void setCountry(String country) { this.country = country; }
    public void setAddress(Address address) { this.address = address; }
}

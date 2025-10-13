package com.acm.cinema_ebkg_system.dto.user;

public class UserInfo {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String state;
    private String country;

    // Default constructor
    public UserInfo() {}

    // Constructor with all fields
    public UserInfo(String email, String password, String firstName, String lastName, 
                   String phoneNumber, String address, String state, String country) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.state = state;
        this.country = country;
    }

    // Getters
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getAddress() { return address; }
    public String getState() { return state; }
    public String getCountry() { return country; }

    // Setters
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setAddress(String address) { this.address = address; }
    public void setState(String state) { this.state = state; }
    public void setCountry(String country) { this.country = country; }
}

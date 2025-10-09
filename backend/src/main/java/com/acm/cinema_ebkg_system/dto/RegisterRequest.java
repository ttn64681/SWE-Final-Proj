package com.acm.cinema_ebkg_system.dto;

/**
 * Register Request DTO - Data Transfer Object for user registration
 * 
 * This DTO represents the data structure sent from the frontend during user registration.
 * It contains all the information needed to create a new user account in the system.
 * 
 * Fields:
 * - email: User's email address (used as username for login)
 * - password: Plain text password (will be hashed before storage)
 * - firstName: User's first name
 * - lastName: User's last name
 * - phoneNumber: Optional contact number
 * - address: Optional street address
 * - state: Optional state/province
 * - country: Optional country
 * 
 * Usage:
 * This DTO is used in the AuthController.register() endpoint to receive
 * registration data from the frontend and create a new User entity.
 * 
 * @author ACM Cinema Team
 * @version 1.0
 */
public class RegisterRequest {
    // ========== REGISTRATION FIELDS ==========
    
    private String email;        // User's email address (required, unique)
    private String password;     // Plain text password (required, will be hashed)
    private String firstName;    // User's first name (required)
    private String lastName;     // User's last name (required)
    private String phoneNumber;  // Optional contact number
    private String address;      // Optional street address
    private String state;        // Optional state/province
    private String country;      // Optional country

    // ========== CONSTRUCTORS ==========
    
    /**
     * Default constructor required for JSON deserialization
     */
    public RegisterRequest() {}

    /**
     * Constructor with all fields for creating a complete registration request
     * 
     * @param email User's email address
     * @param password Plain text password
     * @param firstName User's first name
     * @param lastName User's last name
     * @param phoneNumber Optional phone number
     * @param address Optional street address
     * @param state Optional state/province
     * @param country Optional country
     */
    public RegisterRequest(String email, String password, String firstName, String lastName, 
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

    // ========== GETTERS AND SETTERS ==========
    // Standard getter/setter methods for all fields
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}

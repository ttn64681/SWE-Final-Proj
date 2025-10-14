package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.model.PaymentInfo;
import com.acm.cinema_ebkg_system.service.UserService;
import com.acm.cinema_ebkg_system.dto.user.UserInfo;
import com.acm.cinema_ebkg_system.dto.payment.PaymentRequest;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController // Bean that creates a RESTful controller class that handles HTTP requests
@RequestMapping("/api/users")
public class UserController {
    
    // Dependency injection of UserService for business logic
    private final UserService userService;

    // Constructor injection - Spring automatically provides UserService instance
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/users/ - Return list of all users (for admin use)
    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // GET /api/users/{userId} - Return user by ID
    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    // GET /api/users/{userId}/name - Return user's full name by ID
    @GetMapping("/{userId}/name")
    public String getUserPassword(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return user.getFirstName() + " " + user.getLastName();
    }

    // PUT /api/users/{userId} - Update a user's personal information
    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody UserInfo user) {
        return userService.updatePersonalInfo(userId, user);
    }

    // GET /api/users/{userId}/payment - Get user's payment information
    @GetMapping("/{userId}/payment")
    public List<PaymentInfo> getUserPaymentInfo(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return user.getPaymentInfos();
    }

    // POST /api/users/{userId}/payment - Add new payment info for user
    @PostMapping("/{userId}/payment")
    public User addPaymentInfo(@PathVariable Long userId, @RequestBody PaymentRequest dtoPayment) {
        return userService.addPaymentInfo(userId, dtoPayment);
    }

    @PutMapping("/{userId}/payment/{paymentId}")
    public User updatePaymentInfo(@PathVariable Long userId, @PathVariable Long paymentId, @RequestBody PaymentRequest dtoPayment) {
        return userService.updatePaymentInfo(userId, paymentId, dtoPayment);
    }

    @DeleteMapping("/{userId}/payment/{paymentId}")
    public User deletePaymentInfo(@PathVariable Long userId, @PathVariable Long paymentId) {
        return userService.deletePaymentInfo(userId, paymentId);        
    }
    // Reset a user's password
    /* @PutMapping("/{userId}")
    public String updatePassword(@PathVariable Long userId, @RequestBody String newPassword) {
        return userService.resetPassword(userId, newPassword);
    }*/
}

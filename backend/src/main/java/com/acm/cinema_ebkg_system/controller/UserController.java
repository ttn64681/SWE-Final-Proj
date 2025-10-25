package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.service.UserService;
import com.acm.cinema_ebkg_system.dto.user.UserInfo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
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
    public String getUserName(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return user.getFirstName() + " " + user.getLastName();
    }

    // PUT /api/users/{userId}/info - Update a user's personal information
    @PutMapping("/{userId}/info")
    public User updateUser(@PathVariable Long userId, @RequestBody UserInfo user) {
        return userService.updatePersonalInfo(userId, user);
    }

    // PUT /api/users/{userId}/forgot-password - Reset a user's forgotten password (Login)
    @PutMapping("/{userId}/forgot-password")
    public User resetPassword(@PathVariable Long userId, @RequestBody UserInfo user) {
        return userService.resetForgottenPassword(userId, user);
    }

    // PUT /api/users/{userId}/change-password - Change a user's password (Edit Profile)
    @PutMapping("/{userId}/change-password")
    public User changePassword(@PathVariable Long userId, @RequestBody UserInfo user) {
        return userService.changePassword(userId, user);
    }
    
}

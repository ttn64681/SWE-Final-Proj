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
@RequestMapping("/api")
public class UserController {
    
    // Dependency injection of UserService for business logic
    private final UserService userService;

    // Constructor injection - Spring automatically provides UserService instance
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    // GET /api/user/info - Get current user's information (userId from JWT in frontend)
    @GetMapping("/user/info")
    public User getCurrentUserInfo(@org.springframework.web.bind.annotation.RequestParam Long userId) {
        return userService.getUserById(userId);
    }
    
    // PUT /api/user/info - Update current user's personal information
    @PutMapping("/user/info")
    public User updateCurrentUserInfo(@org.springframework.web.bind.annotation.RequestParam Long userId, @RequestBody UserInfo userInfo) {
        return userService.updatePersonalInfo(userId, userInfo);
    }
    
    // PUT /api/user/change-password - Change current user's password
    @PutMapping("/user/change-password")
    public User changeCurrentUserPassword(@org.springframework.web.bind.annotation.RequestParam Long userId, @RequestBody UserInfo userInfo) {
        return userService.changePassword(userId, userInfo);
    }

    // GET /api/users - Return list of all users (for admin use)
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // GET /api/users/{userId} - Return user by ID
    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    // GET /api/users/{userId}/name - Return user's full name by ID
    @GetMapping("/users/{userId}/name")
    public String getUserName(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return user.getFirstName() + " " + user.getLastName();
    }

    // PUT /api/users/{userId}/info - Update a user's personal information
    @PutMapping("/users/{userId}/info")
    public User updateUser(@PathVariable Long userId, @RequestBody UserInfo user) {
        return userService.updatePersonalInfo(userId, user);
    }

    // PUT /api/users/{userId}/forgot-password - Reset a user's forgotten password (Login)
    @PutMapping("/users/{userId}/forgot-password")
    public User resetPassword(@PathVariable Long userId, @RequestBody UserInfo user) {
        return userService.resetForgottenPassword(userId, user);
    }

    // PUT /api/users/{userId}/change-password - Change a user's password (Edit Profile)
    @PutMapping("/users/{userId}/change-password")
    public User changePassword(@PathVariable Long userId, @RequestBody UserInfo user) {
        return userService.changePassword(userId, user);
    }
    
}

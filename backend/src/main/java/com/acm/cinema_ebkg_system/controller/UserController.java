package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.service.UserService;
import com.acm.cinema_ebkg_system.dto.user.UserInfo;

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
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Return list of users (for admin use)
    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Return user by ID
    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    // Return user's name by ID
    @GetMapping("/{userId}/name")
    public String getUserPassword(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return user.getFirstName() + " " + user.getLastName();
    }

    // Update a user's personal information
    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody UserInfo user) {
        return userService.updatePersonalInfo(userId, user);
    }
}

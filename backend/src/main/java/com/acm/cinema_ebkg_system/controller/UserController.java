package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // Bean that creates a RESTful controller class that handles HTTP requests
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Return user by ID
    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    // Return user's password by ID
    @GetMapping("/{userId}/password")
    public String getUserPassword(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return user.getPassword();
    }


    // Return user password by ID
    /*@GetMapping("/{userId}/pwd")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId).getPassword();
    }*/


    // Return list of users (for admin use)
    /*@GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }*/
}

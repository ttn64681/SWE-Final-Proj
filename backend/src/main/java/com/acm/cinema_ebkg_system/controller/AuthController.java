package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.dto.AuthResponse;
import com.acm.cinema_ebkg_system.dto.LoginRequest;
import com.acm.cinema_ebkg_system.dto.RegisterRequest;
import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.service.UserService;
import com.acm.cinema_ebkg_system.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            // Create user from request
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setPhoneNumber(request.getPhoneNumber());
            user.setAddress(request.getAddress());
            user.setState(request.getState());
            user.setCountry(request.getCountry());

            // Register user
            User savedUser = userService.registerUser(user);

            // Generate tokens
            String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getId());
            String refreshToken = jwtUtil.generateRefreshToken(savedUser.getEmail(), savedUser.getId());

            // Create user DTO
            AuthResponse.UserDto userDto = new AuthResponse.UserDto(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getPhoneNumber(),
                savedUser.getAddress(),
                savedUser.getState(),
                savedUser.getCountry()
            );

            AuthResponse response = new AuthResponse(true, "User registered successfully", token, refreshToken, userDto);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            AuthResponse response = new AuthResponse(false, e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            // Authenticate user
            User user = userService.authenticateUser(request.getEmail(), request.getPassword());

            // Generate tokens
            String token = jwtUtil.generateToken(user.getEmail(), user.getId());
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getId());

            // Create user DTO
            AuthResponse.UserDto userDto = new AuthResponse.UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getState(),
                user.getCountry()
            );

            AuthResponse response = new AuthResponse(true, "Login successful", token, refreshToken, userDto);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            AuthResponse response = new AuthResponse(false, e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestParam String refreshToken) {
        try {
            // Validate refresh token
            String email = jwtUtil.getUsernameFromToken(refreshToken);
            Long userId = jwtUtil.getUserIdFromToken(refreshToken);

            // Generate new access token
            String newToken = jwtUtil.generateToken(email, userId);

            AuthResponse response = new AuthResponse(true, "Token refreshed successfully", newToken, refreshToken, null);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            AuthResponse response = new AuthResponse(false, "Invalid refresh token");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout() {
        AuthResponse response = new AuthResponse(true, "Logout successful");
        return ResponseEntity.ok(response);
    }
}

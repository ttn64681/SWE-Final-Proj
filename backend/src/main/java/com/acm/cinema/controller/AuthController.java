package com.acm.cinema.controller;

import com.acm.cinema.dto.AuthResponse;
import com.acm.cinema.dto.LoginRequest;
import com.acm.cinema.dto.RegisterRequest;
import com.acm.cinema.entity.User;
import com.acm.cinema.service.UserService;
import com.acm.cinema.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Find user by email
            Optional<User> userOpt = userService.findByEmail(loginRequest.getEmail());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse(false, "Invalid email or password"));
            }
            
            User user = userOpt.get();
            
            // Check if user is active
            if (!user.getIsActive()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse(false, "Account is deactivated"));
            }
            
            // Verify password
            if (!userService.verifyPassword(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse(false, "Invalid email or password"));
            }
            
            // Generate tokens
            String accessToken = jwtUtil.generateToken(user.getEmail(), user.getId(), 
                    user.getFirstName(), user.getLastName());
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getId(), 
                    user.getFirstName(), user.getLastName());
            
            // Create user response
            AuthResponse.UserResponse userResponse = new AuthResponse.UserResponse(
                    user.getId(), user.getEmail(), user.getFirstName(), user.getLastName());
            
            return ResponseEntity.ok(new AuthResponse(true, "Login successful", 
                    accessToken, refreshToken, userResponse));
                    
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(false, "An unexpected error occurred"));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            // Check if email already exists
            if (userService.emailExists(registerRequest.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new AuthResponse(false, "An account with this email already exists"));
            }
            
            // Create new user
            User user = new User();
            user.setEmail(registerRequest.getEmail());
            user.setPassword(registerRequest.getPassword());
            user.setFirstName(registerRequest.getFirstName());
            user.setLastName(registerRequest.getLastName());
            user.setPhoneNumber(registerRequest.getPhoneNumber());
            user.setAddress(registerRequest.getAddress());
            user.setState(registerRequest.getState());
            user.setCountry(registerRequest.getCountry());
            
            // Save user
            User savedUser = userService.createUser(user);
            
            // Generate tokens
            String accessToken = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getId(), 
                    savedUser.getFirstName(), savedUser.getLastName());
            String refreshToken = jwtUtil.generateRefreshToken(savedUser.getEmail(), savedUser.getId(), 
                    savedUser.getFirstName(), savedUser.getLastName());
            
            // Create user response
            AuthResponse.UserResponse userResponse = new AuthResponse.UserResponse(
                    savedUser.getId(), savedUser.getEmail(), savedUser.getFirstName(), savedUser.getLastName());
            
            return ResponseEntity.ok(new AuthResponse(true, "Registration successful", 
                    accessToken, refreshToken, userResponse));
                    
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(false, "An unexpected error occurred"));
        }
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse(false, "Invalid refresh token"));
            }
            
            String refreshToken = authHeader.substring(7);
            
            // Validate refresh token
            if (!jwtUtil.validateToken(refreshToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse(false, "Invalid refresh token"));
            }
            
            // Extract user info from token
            String email = jwtUtil.extractUsername(refreshToken);
            Long userId = jwtUtil.extractUserId(refreshToken);
            String firstName = jwtUtil.extractFirstName(refreshToken);
            String lastName = jwtUtil.extractLastName(refreshToken);
            
            // Verify user still exists and is active
            Optional<User> userOpt = userService.findById(userId);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse(false, "User not found or inactive"));
            }
            
            // Generate new tokens
            String newAccessToken = jwtUtil.generateToken(email, userId, firstName, lastName);
            String newRefreshToken = jwtUtil.generateRefreshToken(email, userId, firstName, lastName);
            
            // Create user response
            AuthResponse.UserResponse userResponse = new AuthResponse.UserResponse(
                    userId, email, firstName, lastName);
            
            return ResponseEntity.ok(new AuthResponse(true, "Token refreshed successfully", 
                    newAccessToken, newRefreshToken, userResponse));
                    
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(false, "An unexpected error occurred"));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout() {
        // In a stateless JWT system, logout is handled on the client side
        // by removing the token. We can add token blacklisting here if needed.
        return ResponseEntity.ok(new AuthResponse(true, "Logged out successfully"));
    }
}

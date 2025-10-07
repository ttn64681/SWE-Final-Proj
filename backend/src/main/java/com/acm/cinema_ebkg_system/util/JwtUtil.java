package com.acm.cinema_ebkg_system.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * JWT Utility - Handles JSON Web Token operations
 * 
 * This utility class manages JWT token creation, validation, and data extraction.
 * It provides secure token-based authentication for the cinema booking system.
 * 
 * Key Features:
 * - Generate access tokens (short-lived, for API access)
 * - Generate refresh tokens (long-lived, for token renewal)
 * - Token validation and expiration checking
 * - Extract user information from tokens
 * - HMAC-SHA256 signature algorithm
 * 
 * Token Structure:
 * - Access Token: Contains user email and ID, expires quickly (15 minutes)
 * - Refresh Token: Contains user email, ID, and type="refresh", expires slowly (7 days)
 * 
 * Security Features:
 * - HMAC-SHA256 signature verification
 * - Configurable expiration times
 * - Secure key management via application properties
 * 
 * @author ACM Cinema Team
 * @version 1.0
 */
@Component
public class JwtUtil {

    // ========== CONFIGURATION PROPERTIES ==========
    
    /**
     * JWT secret key for signing tokens (loaded from application.properties)
     * Must be at least 256 bits (32 characters) for HMAC-SHA256
     */
    @Value("${jwt.secret}")
    private String secret;

    /**
     * Access token expiration time in milliseconds (default: 15 minutes)
     * Short-lived token for API access
     */
    @Value("${jwt.access-token-expiration}")
    private Long accessTokenExpiration;

    /**
     * Refresh token expiration time in milliseconds (default: 7 days)
     * Long-lived token for obtaining new access tokens
     */
    @Value("${jwt.refresh-token-expiration}")
    private Long refreshTokenExpiration;

    // ========== SECURITY UTILITIES ==========
    
    /**
     * Generate HMAC-SHA256 signing key from secret string
     * 
     * @return SecretKey for JWT signing and verification
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // ========== TOKEN GENERATION ==========
    
    /**
     * Generate a short-lived access token for API authentication
     * 
     * @param email User's email address (used as subject)
     * @param userId User's unique ID (stored in claims)
     * @return String JWT access token
     */
    public String generateToken(String email, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        return createToken(claims, email, accessTokenExpiration);
    }

    /**
     * Generate a long-lived refresh token for obtaining new access tokens
     * 
     * @param email User's email address (used as subject)
     * @param userId User's unique ID (stored in claims)
     * @return String JWT refresh token
     */
    public String generateRefreshToken(String email, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("type", "refresh");  // Mark as refresh token
        return createToken(claims, email, refreshTokenExpiration);
    }

    /**
     * Core method for creating JWT tokens with specified claims and expiration
     * 
     * @param claims Custom claims to include in the token
     * @param subject Token subject (typically user email)
     * @param expiration Expiration time in milliseconds
     * @return String Complete JWT token
     */
    private String createToken(Map<String, Object> claims, String subject, Long expiration) {
        return Jwts.builder()
                .setClaims(claims)                                    // Custom claims (userId, type, etc.)
                .setSubject(subject)                                  // Token subject (user email)
                .setIssuedAt(new Date(System.currentTimeMillis()))    // Token creation time
                .setExpiration(new Date(System.currentTimeMillis() + expiration))  // Token expiration
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)  // HMAC-SHA256 signature
                .compact();                                           // Build final token string
    }

    // ========== TOKEN VALIDATION ==========
    
    /**
     * Validate a JWT token by checking signature and expiration
     * 
     * @param token JWT token to validate
     * @param email Expected user email (subject)
     * @return Boolean true if token is valid and not expired
     */
    public Boolean validateToken(String token, String email) {
        final String username = getUsernameFromToken(token);
        return (username.equals(email) && !isTokenExpired(token));
    }

    // ========== TOKEN DATA EXTRACTION ==========
    
    /**
     * Extract username (email) from JWT token
     * 
     * @param token JWT token
     * @return String User's email address
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    /**
     * Extract user ID from JWT token claims
     * 
     * @param token JWT token
     * @return Long User's unique ID
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return claims.get("userId", Long.class);
    }

    /**
     * Extract expiration date from JWT token
     * 
     * @param token JWT token
     * @return Date Token expiration date
     */
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    // ========== HELPER METHODS ==========
    
    /**
     * Generic method to extract specific claim from token
     * 
     * @param token JWT token
     * @param claimsResolver Function to extract specific claim
     * @return T Extracted claim value
     */
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Parse JWT token and extract all claims
     * 
     * @param token JWT token to parse
     * @return Claims All token claims
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())  // Verify signature with secret key
                .build()
                .parseClaimsJws(token)           // Parse and validate token
                .getBody();                      // Extract claims
    }

    /**
     * Check if JWT token has expired
     * 
     * @param token JWT token to check
     * @return Boolean true if token is expired
     */
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}

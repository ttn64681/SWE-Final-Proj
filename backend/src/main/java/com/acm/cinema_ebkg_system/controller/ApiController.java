package com.acm.cinema_ebkg_system.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController 
@RequestMapping("/api")
public class ApiController {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access-token-expiration}")
    private String jwtAccessExpiration;
    
    @Value("${jwt.refresh-token-expiration}")
    private String jwtRefreshExpiration;

    @GetMapping("/env")
    public Map<String, String> getEnvironmentVariables() {
        Map<String, String> env = new HashMap<>();
        env.put("DATABASE_URL", dbUrl);
        env.put("DATABASE_USERNAME", dbUsername);
        env.put("DATABASE_PASSWORD", dbPassword);
        env.put("JWT_SECRET", jwtSecret);
        env.put("JWT_ACCESS_TOKEN_EXPIRATION", jwtAccessExpiration);
        env.put("JWT_REFRESH_TOKEN_EXPIRATION", jwtRefreshExpiration);

        return env;
    }

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello from the Spring Boot Backend!";
    }
}
package com.acm.cinema_ebkg_system.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration // Spring configuration class automatically ran on app start
public class CorsConfig implements WebMvcConfigurer {

    @Override // Need to override addCorsMappings to add custom CORS mappings
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // Next.js frontend
                // OPTIONS is an implicit preflight request sent by browser to check if the server allows the request
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // Cache preflight response for 1 hour
    }
}

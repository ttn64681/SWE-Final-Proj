package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@Table(name = "user_status")
public class UserStatus {
    // Primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="status")
    private String status;

    // ========== CONSTRUCTORS ==========
    
    public UserStatus() {}

}

package com.acm.cinema_ebkg_system.model;

// JPA = persistence (maps class <-> table)
import jakarta.persistence.Column;          
import jakarta.persistence.Entity;          
import jakarta.persistence.GeneratedValue;   
import jakarta.persistence.GenerationType;   
import jakarta.persistence.Id;              
import jakarta.persistence.Table;            

// Java time types used by columns
import java.time.LocalDate; // (YYYY-MM-DD)
import java.time.LocalDateTime; // date + time (timestamp)

// Lombok = auto-generate boilerplate (getters/setters/constructors)
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "show_dates")
public class ShowDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long show_date_id;

    @Column(name = "movie_id", nullable = false)
    private Long movie_id;

    @Column(name = "show_date", nullable = false)
    private LocalDate show_date;

    @Column(name = "created_at")
    private LocalDateTime created_at;
}



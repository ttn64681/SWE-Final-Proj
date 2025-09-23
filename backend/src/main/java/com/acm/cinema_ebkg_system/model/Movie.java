package com.acm.cinema_ebkg_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movies")
public class Movie {
    @Id // identifies below 'id' as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // generates unique val for primary key
    private Long id;
    private String title;
    private String genre;
    private String rating;

    // Getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getCategory() {
        return genre;
    }
    public void setCategory(String category) {
        this.genre = category;
    }
    public String getRating() {
        return rating;
    }
    public void setRating(String rating) {
        this.rating = rating;
    }
}
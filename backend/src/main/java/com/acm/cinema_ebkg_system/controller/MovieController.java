package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.Movie;
import com.acm.cinema_ebkg_system.service.MovieService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController // Bean that creates a RESTful controller class that handles HTTP requests
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/search")
    public List<Movie> getMovies(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genres, // comma-separated
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer day,
            @RequestParam(required = false) Integer year) {
        return movieService.searchMovies(title, genres, month, day, year);
    }

    @GetMapping("/test")
    public String testEndpoint() {
        return "API is working!";
    }

    @PostMapping("/create")
    public String postMovie() {
        return "Posted movie.";
    }

}
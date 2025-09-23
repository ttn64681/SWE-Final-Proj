package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.Movie;
import com.acm.cinema_ebkg_system.repository.MovieRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieRepository movieRepository;

    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @PostMapping
    public String postMovie() {
        return "Posted movie.";
    }

}
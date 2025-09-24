package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.Movie;
import com.acm.cinema_ebkg_system.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> searchMovies(String title, String genresCsv, Integer month, Integer day, Integer year) {
        if (title != null && !title.isBlank()) {
            return movieRepository.findByTitleContainingIgnoreCase(title);
        }
        if (genresCsv != null && !genresCsv.isBlank()) {
            String first = genresCsv.split(",")[0].trim();
            return movieRepository.findByGenreIgnoreCase(first);
        }
        if (month != null && day != null) {
            int y = (year != null) ? year : LocalDate.now().getYear();
            return movieRepository.findByReleaseMonthDayYear(month, day, y);
        }
        return movieRepository.findAll();
    }
}



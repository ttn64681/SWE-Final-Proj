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

    // CURRENTLY JUST FINDS THE FIRST GENRE IN THE STRING
    public List<Movie> searchMovies(String title, String genres, Integer month, Integer day, Integer year) {
        if (title != null && !title.isBlank()) {
            return movieRepository.findByTitleContainingIgnoreCase(title);
        }
        if (genres != null && !genres.isBlank()) {
            // regex:"," looks for a comma, [0] looks for first genre, trim() removes whitespace
            String first = genres.split(",")[0].trim(); 
        
            return movieRepository.findByGenresIgnoreCase(first);
        }
        if (month != null && day != null) {
            int y = (year != null) ? year : LocalDate.now().getYear();
            return movieRepository.findByReleaseMonthDayYear(month, day, y);
        }
        return movieRepository.findAll();
    }
}



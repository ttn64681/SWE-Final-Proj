package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.Movie;
import com.acm.cinema_ebkg_system.model.ShowTime;
import com.acm.cinema_ebkg_system.service.MovieService;
import com.acm.cinema_ebkg_system.service.ShowTimeService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController // Bean that creates a RESTful controller class that handles HTTP requests
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;
    private final ShowTimeService showTimeService;

    public MovieController(MovieService movieService, ShowTimeService showTimeService) {
        this.movieService = movieService;
        this.showTimeService = showTimeService;
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

    // Show schedule endpoints
    @GetMapping("/{movieId}/dates")
    public List<LocalDate> getAvailableDates(@PathVariable Long movieId) {
        // Frontend: call this first to populate the date dropdown for a selected movie.
        // Return format (JSON): ["2025-10-01", "2025-10-02", ...]
        return showTimeService.getAvailableDatesForMovie(movieId);
    }

    @GetMapping("/{movieId}/times")
    public List<ShowTime> getAvailableTimes(@PathVariable Long movieId, @RequestParam String date) {
        // Frontend: when user picks a date from the dropdown, call this with that date.
        // Return format (JSON): array of ShowTime objects, e.g.
        // [{"show_time_id": 123, "show_date_id": 45, "start_time": "10:00:00", "end_time": "12:30:00", "created_at": "2025-09-26T12:00:00"}, ...]
        LocalDate showDate = LocalDate.parse(date);
        return showTimeService.getAvailableTimesForMovieAndDate(movieId, showDate);
    }

    @GetMapping("/{movieId}/schedule")
    public Map<LocalDate, List<ShowTime>> getMovieSchedule(@PathVariable Long movieId) {
        // Frontend (optional convenience): fetch full schedule (dates -> times) in one call.
        // Return format (JSON): {"2025-10-01": [ShowTime, ...], "2025-10-02": [ShowTime, ...], ...}
        return showTimeService.getMovieShowSchedule(movieId);
    }

}
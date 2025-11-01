package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.MovieShow;
import com.acm.cinema_ebkg_system.service.MovieShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Movie Show Controller
 */
@RestController
@RequestMapping("/api/movie-shows")
public class MovieShowController {
    
    @Autowired // Spring automatically provides service instance (dependency injection)
    private MovieShowService movieShowService;
    
    /**
     * GET /api/movie-shows
     * Input: None
     * Returns: List<MovieShow> - All movie shows in system
     */
    @GetMapping
    public List<MovieShow> getAllMovieShows() {
        return movieShowService.getAllMovieShows();
    }
    
    /**
     * GET /api/movie-shows/movie/{movieId}
     * Input: movieId (Long) in URL path
     * Returns: List<MovieShow> - All shows for this movie
     */
    @GetMapping("/movie/{movieId}")
    public List<MovieShow> getMovieShowsByMovie(@PathVariable Long movieId) {
        return movieShowService.getMovieShowsByMovieId(movieId);
    }
    
    /**
     * POST /api/movie-shows (admin only)
     * Input: MovieShow JSON body with {movie_id, show_room_id, status, available_seats}
     * Returns: MovieShow - Created show with ID and timestamps
     */
    @PostMapping
    public MovieShow createMovieShow(@RequestBody MovieShow movieShow) {
        return movieShowService.createMovieShow(movieShow);
    }
    
    /**
     * PUT /api/movie-shows/{movieShowId} (admin only)
     * Input: movieShowId (Long) in URL path, MovieShow JSON body with updated fields
     * Returns: MovieShow - Updated show
     */
    @PutMapping("/{movieShowId}")
    public MovieShow updateMovieShow(
            @PathVariable Long movieShowId,
            @RequestBody MovieShow movieShow) {
        movieShow.setId(movieShowId);
        return movieShowService.updateMovieShow(movieShow);
    }
    
    /**
     * DELETE /api/movie-shows/{movieShowId} (admin only)
     * Input: movieShowId (Long) in URL path
     * Returns: 200 OK - Show deleted (no body)
     */
    @DeleteMapping("/{movieShowId}")
    public ResponseEntity<Void> deleteMovieShow(@PathVariable Long movieShowId) {
        movieShowService.deleteMovieShow(movieShowId);
        return ResponseEntity.ok().build();
    }
}


package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.MovieShow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Movie Show Repository
 * 
 * Automatically provides: save(), findById(), findAll(), deleteById(), count(), existsById()
 */
@Repository
public interface MovieShowRepository extends JpaRepository<MovieShow, Long> {
    
    // Find movie shows by movie
    List<MovieShow> findByMovieId(Long movieId);
    
    // Find movie shows by show room
    List<MovieShow> findByShowRoomId(Long showRoomId);
    
    // Find movie shows by status
    List<MovieShow> findByStatus(String status);
    
    // Find movie shows by movie and status
    List<MovieShow> findByMovieIdAndStatus(Long movieId, String status);
}


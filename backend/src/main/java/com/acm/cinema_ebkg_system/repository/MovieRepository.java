package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.Movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * 
 * JpaRepository<Movie, Long>: Generic type = (EntityType, IDType)
 */
@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    // Automatic methods:
    // findAll(), findById(movie_id, save(), delete(), deleteById()
    
    // Derived queries
    List<Movie> findByGenreIgnoreCase(String genre);
    List<Movie> findByTitleContainingIgnoreCase(String titlePart);

    // Month/day/year via JPQL (delegates to DB functions)
    @Query("select m from Movie m where EXTRACT(MONTH FROM m.releaseDate) = :month and EXTRACT(DAY FROM m.releaseDate) = :day and EXTRACT(YEAR FROM m.releaseDate) = :year")
    List<Movie> findByReleaseMonthDayYear(@Param("month") int month, @Param("day") int day, @Param("year") int year);

} 
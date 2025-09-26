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
    // findAll(), findById(movie_id), save(), delete(), deleteById(), flush(), saveAndFlush(), etc.

    // Derived queries
    List<Movie> findByTitleContainingIgnoreCase(String titlePart);
    
    // Custom JPQL query for genre search (handles comma-separated genres)
    @Query("SELECT m FROM Movie m WHERE LOWER(m.genres) LIKE LOWER(CONCAT('%', :genre, '%'))")
    List<Movie> findByGenresContainingIgnoreCase(@Param("genre") String genre);

    // JPQL query which maps to PostgreSQL functions 
    @Query("select m from Movie m where EXTRACT(MONTH FROM m.release_date) = :month and EXTRACT(DAY FROM m.release_date) = :day and EXTRACT(YEAR FROM m.release_date) = :year")
    List<Movie> findByReleaseMonthDayYear(@Param("month") int month, @Param("day") int day, @Param("year") int year);

} 
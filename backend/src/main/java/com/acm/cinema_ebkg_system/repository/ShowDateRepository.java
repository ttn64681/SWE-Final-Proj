package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.ShowDate;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowDateRepository extends JpaRepository<ShowDate, Long> {

    /**
     * Returns distinct calendar dates that have show entries for a given movie.
     *
     * @param movieId movie primary key (must exist in movies table)
     * @return ordered list of LocalDate values (no duplicates), ascending
     */
    @Query("SELECT DISTINCT sd.show_date FROM ShowDate sd WHERE sd.movie_id = :movieId ORDER BY sd.show_date")
    List<LocalDate> findAvailableDatesByMovieId(@Param("movieId") Long movieId);

    /**
     * Returns the ShowDate row for a specific movie on a specific date.
     * Uses explicit @Query because entity fields are snake_case (movie_id, show_date).
     */
    @Query("SELECT sd FROM ShowDate sd WHERE sd.movie_id = :movieId AND sd.show_date = :showDate")
    Optional<ShowDate> findByMovieIdAndDate(@Param("movieId") Long movieId, @Param("showDate") LocalDate showDate);

    /**
     * Returns all ShowDate rows for a movie, ordered by date ascending.
     * Uses explicit @Query because entity fields are snake_case.
     */
    @Query("SELECT sd FROM ShowDate sd WHERE sd.movie_id = :movieId ORDER BY sd.show_date")
    List<ShowDate> findByMovieId(@Param("movieId") Long movieId);
}



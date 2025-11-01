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
     * Uses movie_show relationship only.
     *
     * @param movieId movie primary key (used to find corresponding movie_show)
     * @return ordered list of LocalDate values (no duplicates), ascending
     */
    @Query(value = """
        SELECT DISTINCT sd.show_date 
        FROM show_date sd
        INNER JOIN movie_show ms ON sd.movie_show_id = ms.id
        WHERE ms.movie_id = :movieId
        ORDER BY sd.show_date
    """, nativeQuery = true)
    List<java.sql.Date> findAvailableDatesByMovieId(@Param("movieId") Long movieId);

    /**
     * Returns the ShowDate row for a specific movie on a specific date.
     * Uses movie_show relationship only.
     */
    @Query(value = """
        SELECT sd.* FROM show_date sd 
        INNER JOIN movie_show ms ON sd.movie_show_id = ms.id
        WHERE ms.movie_id = :movieId AND sd.show_date = :showDate
    """, nativeQuery = true)
    Optional<ShowDate> findByMovieIdAndDate(@Param("movieId") Long movieId, @Param("showDate") LocalDate showDate);

    /**
     * Returns all ShowDate rows for a movie, ordered by date ascending.
     * Uses movie_show relationship only.
     */
    @Query(value = """
        SELECT sd.* FROM show_date sd 
        INNER JOIN movie_show ms ON sd.movie_show_id = ms.id
        WHERE ms.movie_id = :movieId
        ORDER BY sd.show_date
    """, nativeQuery = true)
    List<ShowDate> findByMovieId(@Param("movieId") Long movieId);
}



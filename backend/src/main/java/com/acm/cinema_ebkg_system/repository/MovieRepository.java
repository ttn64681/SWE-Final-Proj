package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.Movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
}
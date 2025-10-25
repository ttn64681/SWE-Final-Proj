package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.ShowRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Show Room Repository
 * 
 * Automatically provides: save(), findById(), findAll(), deleteById(), count(), existsById()
 */
@Repository
public interface ShowRoomRepository extends JpaRepository<ShowRoom, Long> {
}

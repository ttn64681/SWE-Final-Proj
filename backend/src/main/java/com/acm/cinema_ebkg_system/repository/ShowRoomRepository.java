package com.acm.cinema_ebkg_system.repository;

import com.acm.cinema_ebkg_system.model.ShowRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Show Room Repository - Data access layer for ShowRoom entities
 * 
 * Provides CRUD operations and custom query methods for show room management.
 * Supports finding show rooms by name and capacity ranges.
 */
@Repository
public interface ShowRoomRepository extends JpaRepository<ShowRoom, Long> {
    
    /**
     * Find show rooms by name containing specified text (case insensitive)
     * @param name the name to search for
     * @return list of show rooms matching the name criteria
     */
    List<ShowRoom> findByNameContainingIgnoreCase(String name);
    
    /**
     * Find show rooms with capacity greater than specified amount
     * @param capacity the minimum capacity
     * @return list of show rooms with capacity greater than specified
     */
    List<ShowRoom> findByCapacityGreaterThan(Integer capacity);
    
    /**
     * Find show rooms with capacity between specified range
     * @param minCapacity the minimum capacity
     * @param maxCapacity the maximum capacity
     * @return list of show rooms within the capacity range
     */
    List<ShowRoom> findByCapacityBetween(Integer minCapacity, Integer maxCapacity);
}

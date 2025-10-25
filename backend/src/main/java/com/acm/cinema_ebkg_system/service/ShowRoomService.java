package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.ShowRoom;
import com.acm.cinema_ebkg_system.repository.ShowRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Show Room Service - Business logic layer for show room management
 * 
 * Provides business logic for show room operations including CRUD operations
 * and specialized queries for capacity and name-based searches.
 */
@Service
public class ShowRoomService {
    
    @Autowired
    private ShowRoomRepository showRoomRepository;
    
    /**
     * Get all show rooms
     * @return list of all show rooms
     */
    public List<ShowRoom> getAllShowRooms() {
        return showRoomRepository.findAll();
    }
    
    /**
     * Get show rooms with capacity greater than specified amount
     * @param minCapacity the minimum capacity
     * @return list of show rooms with capacity greater than specified
     */
    public List<ShowRoom> getShowRoomsByCapacity(Integer minCapacity) {
        return showRoomRepository.findByCapacityGreaterThan(minCapacity);
    }
    
    /**
     * Get show rooms with capacity between specified range
     * @param minCapacity the minimum capacity
     * @param maxCapacity the maximum capacity
     * @return list of show rooms within the capacity range
     */
    public List<ShowRoom> getShowRoomsByCapacityRange(Integer minCapacity, Integer maxCapacity) {
        return showRoomRepository.findByCapacityBetween(minCapacity, maxCapacity);
    }
    
    /**
     * Search show rooms by name (case insensitive)
     * @param name the name to search for
     * @return list of show rooms matching the name criteria
     */
    public List<ShowRoom> searchShowRoomsByName(String name) {
        return showRoomRepository.findByNameContainingIgnoreCase(name);
    }
    
    /**
     * Create a new show room
     * @param showRoom the show room to create
     * @return the created show room
     */
    public ShowRoom createShowRoom(ShowRoom showRoom) {
        return showRoomRepository.save(showRoom);
    }
    
    /**
     * Update an existing show room
     * @param showRoom the show room to update
     * @return the updated show room
     */
    public ShowRoom updateShowRoom(ShowRoom showRoom) {
        return showRoomRepository.save(showRoom);
    }
    
    /**
     * Delete a show room by ID
     * @param showRoomId the show room ID to delete
     */
    public void deleteShowRoom(Long showRoomId) {
        showRoomRepository.deleteById(showRoomId);
    }
}

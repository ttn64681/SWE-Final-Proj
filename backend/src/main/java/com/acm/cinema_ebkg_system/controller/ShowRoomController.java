package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.ShowRoom;
import com.acm.cinema_ebkg_system.service.ShowRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Show Room Controller - REST API endpoints for show room management
 * 
 * Provides REST endpoints for show room operations including CRUD operations
 * and specialized queries for capacity and name-based searches.
 */
@RestController
@RequestMapping("/api/show-rooms")
@CrossOrigin(origins = "*")
public class ShowRoomController {
    
    @Autowired
    private ShowRoomService showRoomService;
    
    /**
     * Get all show rooms
     * @return list of all show rooms
     */
    @GetMapping
    public ResponseEntity<List<ShowRoom>> getAllShowRooms() {
        List<ShowRoom> showRooms = showRoomService.getAllShowRooms();
        return ResponseEntity.ok(showRooms);
    }
    
    /**
     * Get show rooms with capacity greater than specified amount
     * @param minCapacity the minimum capacity
     * @return list of show rooms with capacity greater than specified
     */
    @GetMapping("/capacity/{minCapacity}")
    public ResponseEntity<List<ShowRoom>> getShowRoomsByCapacity(@PathVariable Integer minCapacity) {
        List<ShowRoom> showRooms = showRoomService.getShowRoomsByCapacity(minCapacity);
        return ResponseEntity.ok(showRooms);
    }
    
    /**
     * Search show rooms by name (case insensitive)
     * @param name the name to search for
     * @return list of show rooms matching the name criteria
     */
    @GetMapping("/search/{name}")
    public ResponseEntity<List<ShowRoom>> searchShowRoomsByName(@PathVariable String name) {
        List<ShowRoom> showRooms = showRoomService.searchShowRoomsByName(name);
        return ResponseEntity.ok(showRooms);
    }
    
    /**
     * Create a new show room
     * @param showRoom the show room to create
     * @return the created show room
     */
    @PostMapping
    public ResponseEntity<ShowRoom> createShowRoom(@RequestBody ShowRoom showRoom) {
        ShowRoom createdRoom = showRoomService.createShowRoom(showRoom);
        return ResponseEntity.ok(createdRoom);
    }
    
    /**
     * Update an existing show room
     * @param showRoomId the show room ID
     * @param showRoom the show room data to update
     * @return the updated show room
     */
    @PutMapping("/{showRoomId}")
    public ResponseEntity<ShowRoom> updateShowRoom(
            @PathVariable Long showRoomId, 
            @RequestBody ShowRoom showRoom) {
        showRoom.setId(showRoomId);
        ShowRoom updatedRoom = showRoomService.updateShowRoom(showRoom);
        return ResponseEntity.ok(updatedRoom);
    }
    
    /**
     * Delete a show room
     * @param showRoomId the show room ID to delete
     * @return success response
     */
    @DeleteMapping("/{showRoomId}")
    public ResponseEntity<Void> deleteShowRoom(@PathVariable Long showRoomId) {
        showRoomService.deleteShowRoom(showRoomId);
        return ResponseEntity.ok().build();
    }
}

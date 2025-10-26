package com.acm.cinema_ebkg_system.controller;

import com.acm.cinema_ebkg_system.model.ShowRoom;
import com.acm.cinema_ebkg_system.service.ShowRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Show Room Controller
 */
@RestController
@RequestMapping("/api/show-rooms")
public class ShowRoomController {
    
    @Autowired // Spring automatically provides service instance (dependency injection)
    private ShowRoomService showRoomService;
    
    /**
     * GET /api/show-rooms
     * Input: None
     * Returns: 200 OK with List<ShowRoom> - all show rooms in system
     */
    @GetMapping
    public List<ShowRoom> getAllShowRooms() {
        return showRoomService.getAllShowRooms();
    }
    
    /**
     * POST /api/show-rooms
     * Input: ShowRoom JSON body with {name, capacity}
     * Returns: 200 OK with ShowRoom - created show room with ID and timestamps
     */
    @PostMapping
    public ShowRoom createShowRoom(@RequestBody ShowRoom showRoom) {
        return showRoomService.createShowRoom(showRoom);
    }
    
    /**
     * PUT /api/show-rooms/{showRoomId}
     * Input: showRoomId (Long) in URL path, ShowRoom JSON body with updated fields
     * Returns: 200 OK with ShowRoom - updated show room
     */
    @PutMapping("/{showRoomId}")
    public ShowRoom updateShowRoom(
            @PathVariable Long showRoomId, 
            @RequestBody ShowRoom showRoom) {
        showRoom.setId(showRoomId);
        return showRoomService.updateShowRoom(showRoom);
    }
    
    /**
     * DELETE /api/show-rooms/{showRoomId}
     * Input: showRoomId (Long) in URL path
     * Returns: 200 OK - show room deleted (build() -> no body, just 200 OK)
     */
    @DeleteMapping("/{showRoomId}")
    public ResponseEntity<Void> deleteShowRoom(@PathVariable Long showRoomId) {
        showRoomService.deleteShowRoom(showRoomId);
        return ResponseEntity.ok().build();
    }
}

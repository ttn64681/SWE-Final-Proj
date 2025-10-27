package com.acm.cinema_ebkg_system.service;

import com.acm.cinema_ebkg_system.model.ShowRoom;
import com.acm.cinema_ebkg_system.repository.ShowRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Show Room Service
 */
@Service
public class ShowRoomService {
    
    @Autowired
    private ShowRoomRepository showRoomRepository;
    
    public List<ShowRoom> getAllShowRooms() {
        return showRoomRepository.findAll();
    }
    
    public ShowRoom createShowRoom(ShowRoom showRoom) {
        return showRoomRepository.save(showRoom);
    }
    
    public ShowRoom updateShowRoom(ShowRoom showRoom) {
        return showRoomRepository.save(showRoom);
    }
    
    public void deleteShowRoom(Long showRoomId) {
        showRoomRepository.deleteById(showRoomId);
    }
}

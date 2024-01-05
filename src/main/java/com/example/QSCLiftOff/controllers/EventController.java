package com.example.QSCLiftOff.controllers;

import com.example.QSCLiftOff.models.Event;
import com.example.QSCLiftOff.models.DTOs.idDTO;
import com.example.QSCLiftOff.models.data.EventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {
    
    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/events")
    public Iterable<Event> getAllEvents(){
        return eventRepository.findAll();
}

    @PostMapping("/createEvent")
    public ResponseEntity<String> createEvent(@RequestBody Event data){

        Event event = new Event(data.getTitle(), data.getStart(), data.getEnd(), data.getAllDay() );
        eventRepository.save(event);
        return new ResponseEntity<>("Resource created successfully", HttpStatus.CREATED);
    }

    @PostMapping("/editEvent")
    public ResponseEntity<String> editEvent(@RequestBody Map<String, Object> request){
        idDTO id = (idDTO) request.get("id");

        Optional<Event> optionalExistingEvent = eventRepository.findById(id.getId());
        if (optionalExistingEvent.isPresent()){
            Event existingEvent = optionalExistingEvent.get();
            Event data = (Event) request.get("event");
            existingEvent.setAllDay(data.isAllDay()); existingEvent.setEnd(data.getEnd()); existingEvent.setStart(data.getStart()); existingEvent.setTitle(data.getTitle());
            eventRepository.save(existingEvent);
            return new ResponseEntity<>("Resource edited successfully", HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>("Resource not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/deleteEvent")
    public ResponseEntity<String> deleteEvent(@RequestBody idDTO data){
        eventRepository.deleteById(data.getId());;
        return new ResponseEntity<>("Resource deleted successfully", HttpStatus.ACCEPTED);
    }
}

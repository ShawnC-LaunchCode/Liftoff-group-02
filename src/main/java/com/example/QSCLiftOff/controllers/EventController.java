package com.example.QSCLiftOff.controllers;

import com.example.QSCLiftOff.models.Event;
import com.example.QSCLiftOff.models.User;
import com.example.QSCLiftOff.models.DTOs.AddEventDTO;
import com.example.QSCLiftOff.models.DTOs.EventDTO;
import com.example.QSCLiftOff.models.DTOs.idDTO;
import com.example.QSCLiftOff.models.data.EventRepository;
import com.example.QSCLiftOff.models.data.UserRepository;

import net.minidev.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;

import java.util.ArrayList;
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

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/events")
    public Iterable<Event> getAllEvents(){
        return eventRepository.findAll();
}

@GetMapping("/events/{username}")
    public Iterable<Event> getUserEvents(@PathVariable String username){
        Optional<User> optUser = userRepository.findByUsername(username);

        if (optUser.isPresent()){
            User user = optUser.get();
            return eventRepository.findByUser(user);
        } else {
            return eventRepository.findByUser(null);
        }
        
}

    @PostMapping("/createEvent")
    public ResponseEntity<String> createEvent(@RequestBody AddEventDTO data){

        Optional<User> optUser = userRepository.findByUsername(data.getUsername());
        System.out.println(data.getUsername());
        if (optUser.isPresent()){
        User user = optUser.get();
        Event event = new Event(data.getTitle(), data.getStart(), data.getEnd(), data.getAllDay(), user );
        eventRepository.save(event);
        return new ResponseEntity<>("Resource created successfully", HttpStatus.CREATED);}
        else{
        return new ResponseEntity<>("Resource not created successfully", HttpStatus.ACCEPTED);
        }
    }

    @PostMapping("/editEvent")
    public ResponseEntity<String> editEvent(@RequestBody EventDTO data){

        Optional<Event> optionalExistingEvent = eventRepository.findById(data.getId());
        if (optionalExistingEvent.isPresent()){
            Event existingEvent = optionalExistingEvent.get();
            existingEvent.setAllDay(data.isAllDay()); existingEvent.setEnd(data.getEnd()); existingEvent.setStart(data.getStart()); existingEvent.setTitle(data.getTitle()); existingEvent.setUser(data.getUser());
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

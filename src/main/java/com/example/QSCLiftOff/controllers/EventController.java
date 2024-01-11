package com.example.QSCLiftOff.controllers;

import com.example.QSCLiftOff.models.Event;
import com.example.QSCLiftOff.models.data.EventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
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
}

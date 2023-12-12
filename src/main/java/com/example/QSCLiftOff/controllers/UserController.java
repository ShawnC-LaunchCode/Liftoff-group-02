package com.example.QSCLiftOff.controllers;

import com.example.QSCLiftOff.models.DTOs.loginFormDTO;
import com.example.QSCLiftOff.models.User;
import com.example.QSCLiftOff.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
@Autowired
    private UserRepository userRepository;

@GetMapping("/users")

    public HashMap<User, String> getAllUsers(){
    HashMap<User, String> objectMap = new HashMap<>();

    Iterable<User> allUsers = userRepository.findAll();

    for (User myObject : allUsers) {
        objectMap.put(myObject, myObject.getPwhash());
    }

    return objectMap;
}

@PostMapping("/createResource")
    public ResponseEntity<String> createResource(@RequestBody  loginFormDTO data) {
        User user = new User();
        // ...

        return new ResponseEntity<>("Resource created successfully", HttpStatus.CREATED);
    }
@GetMapping("/{username}")
    public User getSpecificUser(@PathVariable String username){
    return userRepository.findByUsername(username);
}
}

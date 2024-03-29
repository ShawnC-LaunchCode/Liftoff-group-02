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
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {
@Autowired
    private UserRepository userRepository;

@GetMapping("/users")

    public Iterable<User> getAllUsers(){
    
        return userRepository.findAll();
}

@PostMapping("/createResource")
    public ResponseEntity<String> createResource(@RequestBody  loginFormDTO data) {
        Optional<User> userOptional = userRepository.findByUsername(data.getUsername());
        User user;

        if (userOptional.isPresent()){
            return new ResponseEntity<>("Username already exists", HttpStatus.OK);
        }else{
        user = new User(data.getUsername(), data.getPassword());
        userRepository.save(user);
        return new ResponseEntity<>("Resource created successfully", HttpStatus.CREATED);
        }
    }


//    @PostMapping("/login")
//    public ResponseEntity<String> loginUser(@RequestBody loginFormDTO data) {
//        // Validate login credentials and generate authentication token
//        Optional<User> userOptional = userRepository.findByUsername(data.getUsername());
//        User user;
//        if (userOptional.isPresent()) {
//            // User exists, proceed with validation
//            user = userOptional.get();
//        }else{
//        return new ResponseEntity<>("UserName: Not successful", HttpStatus.UNAUTHORIZED);
//        }
//
//        if (user.isMatchingPassword(data.getPassword())){
//        return new ResponseEntity<>("Login successful", HttpStatus.OK);
//        } else {return new ResponseEntity<>("Password: Not successful", HttpStatus.UNAUTHORIZED);
//
//        }
//    }

@GetMapping("/{username}")
    public Optional<User> getSpecificUser(@PathVariable String username){
    return userRepository.findByUsername(username);
}
}

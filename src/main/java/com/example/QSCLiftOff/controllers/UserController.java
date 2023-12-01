package com.example.QSCLiftOff.controllers;

import com.example.QSCLiftOff.models.User;
import com.example.QSCLiftOff.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
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
@GetMapping("/{username}")
    public User getSpecificUser(@PathVariable String username){
    return userRepository.findByUsername(username);
}
}

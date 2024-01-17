package com.example.QSCLiftOff.controllers;



import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.QSCLiftOff.models.User;
import com.example.QSCLiftOff.models.data.UserRepository;

import java.security.Principal;
import java.util.Optional;


@RequestMapping("/sessions")
@RestController
public class SessionController {

    @Autowired
    private UserRepository userRepository;

    private final String HOME_VIEW_COUNT = "HOME_VIEW_COUNT";

    @GetMapping("/hello")
    public String hello(Principal principal, HttpSession session) {
        incrementCount(session, HOME_VIEW_COUNT);
        return "Hello, " + principal.getName();
    }

    @GetMapping("/user")
    public User sessionUser(Principal principal, HttpSession session){
            Optional<User> optUser = userRepository.findByUsername(principal.getName());
            if (optUser.isPresent()){
                return optUser.get();
            } else {
                return new User(null, null);
            }
    }

    @GetMapping("/count")
    public String count(HttpSession session) {
        return "HOME_VIEW_COUNT: " + session.getAttribute(HOME_VIEW_COUNT);
    }

    private void incrementCount(HttpSession session, String attr) {
        var homeViewCount = session.getAttribute(attr) == null ? 0 : (Integer) session.getAttribute(attr);
        session.setAttribute(attr, homeViewCount += 1);
    }


}


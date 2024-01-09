package com.example.QSCLiftOff.controllers;



import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

//@CrossOrigin(origins = {"http://localhost:3000"}, allowedHeaders = "*", allowCredentials = "true")
@RestController
public class SessionController {

    private final String HOME_VIEW_COUNT = "HOMER_VIEW_COUNT";

    @GetMapping("/")
    public String hello(Principal principal, HttpSession session) {
        incrementCount(session, HOME_VIEW_COUNT);
        return "Hello, " + principal.getName();
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


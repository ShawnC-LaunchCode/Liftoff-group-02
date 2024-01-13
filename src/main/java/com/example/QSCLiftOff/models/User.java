package com.example.QSCLiftOff.models;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;
@Entity
public class User {

    @Id
    @GeneratedValue
    private int id;
@NotNull
    private String username;
@NotNull
    private String pwhash;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Event> events;

@ManyToMany
@JoinTable(
        name = "user_event",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private List<Event> invitedTo;

    public User(){}

    public User(String username, String password){
        this.username = username; this.pwhash = encoder.encode(password) ;
    }

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPwhash() {
        return pwhash;
    }

    public Boolean isMatchingPassword(String password){
        return encoder.matches(password,pwhash);
}

    @Override
    public String toString() {
        return username;
    }


    public List<Event> getEvents() {
        return this.events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public List<Event> getInvitedTo() {
        return this.invitedTo;
    }

    public void setInvitedTo(List<Event> invitedTo) {
        this.invitedTo = invitedTo;
    }

}
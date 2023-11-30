package com.example.QSCLiftOff.models;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
}
package com.example.QSCLiftOff.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
@Entity
public class User {

    @Id
    @GeneratedValue
    private int id;

    private String name;

    private String password;

    public User(){}

    public User(String name, String password){
        this.name = name; this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
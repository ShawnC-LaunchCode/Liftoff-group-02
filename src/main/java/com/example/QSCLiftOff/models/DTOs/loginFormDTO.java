package com.example.QSCLiftOff.models.DTOs;
import java.util.Objects;

public class loginFormDTO {
    private String username;
    private String password;

    loginFormDTO(){}

    loginFormDTO(String username, String password){
        this.username = username;
        this.password = password;
    }


    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}

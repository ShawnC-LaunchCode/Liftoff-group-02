package com.example.QSCLiftOff.models;

import java.util.Objects;


public class Event extends AbstractEvent {

    private String date;

    private String location;

    private String description;

  public Event(){
      super();
  }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

package com.example.QSCLiftOff.models.DTOs;

import java.util.Date;

import com.example.QSCLiftOff.models.User;

public class EventDTO {
    
    public String title;
    public Date start;
    public Date end;
    public boolean allDay;
    public User user;
    public int id;

    EventDTO(){

    }

    EventDTO(String title, Date start, Date end, boolean allDay, User user, int id){
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.user = user;
        this.id = id;
    }
    

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getStart() {
        return this.start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return this.end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public boolean isAllDay() {
        return this.allDay;
    }

    public boolean getAllDay() {
        return this.allDay;
    }

    public void setAllDay(boolean allDay) {
        this.allDay = allDay;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}

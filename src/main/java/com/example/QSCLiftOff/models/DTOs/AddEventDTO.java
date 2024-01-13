package com.example.QSCLiftOff.models.DTOs;

import java.util.Date;

import com.example.QSCLiftOff.models.User;

public class AddEventDTO {
    
    public String title;
    public Date start;
    public Date end;
    public boolean allDay;
    public String username;

    AddEventDTO(){

    }

    AddEventDTO(String title, Date start, Date end, boolean allDay, String username){
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.username = username;
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


    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


}

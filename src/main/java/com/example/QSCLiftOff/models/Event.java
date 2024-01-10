package com.example.QSCLiftOff.models;

import java.util.Date;

import jakarta.persistence.*;

@Entity
public class Event {
  
    @Id
    @GeneratedValue
    private int id;

    private String title;

    private Date start;

    private Date end;

    private boolean allDay;

@ManyToOne
@JoinColumn(name = "user_id")
    private User user;


    public Event(){}

    public Event(String title, Date start, Date end, boolean allDay, User user){
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.user = user;
    }

        public int getId() {
        return this.id;
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

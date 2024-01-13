package com.example.QSCLiftOff.models.data;

import com.example.QSCLiftOff.models.Event;
import com.example.QSCLiftOff.models.User;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {
    Iterable<Event> findByUser (User user);
}
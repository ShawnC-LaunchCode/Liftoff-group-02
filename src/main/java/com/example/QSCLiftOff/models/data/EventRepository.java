package com.example.QSCLiftOff.models.data;

import com.example.QSCLiftOff.models.Event;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {
    Optional<Event> findByTitle(String title);
}
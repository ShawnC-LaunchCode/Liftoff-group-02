package com.example.QSCLiftOff.models.data;

import com.example.QSCLiftOff.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
}
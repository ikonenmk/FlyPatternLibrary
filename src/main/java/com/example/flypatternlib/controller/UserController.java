package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.User;
import com.example.flypatternlib.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    //Add a new user
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void add(@RequestBody User user) {
        repository.save(user);
    }

    //Find user by id
    @GetMapping("/{user_id}")
    public Optional<User> findById(@PathVariable Integer user_id) {

        //Search for user id, return only if Optional<User> is non-empty
        Optional<User> foundUser = repository.findById(user_id);
        if (foundUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        } else {
            return foundUser;
        }
    }

    //Update user
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{user_id}")
    public void update(@RequestBody User user, @PathVariable Integer user_id) {
        //if user not found in db, throw error
        if(!repository.existsById(user_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }
        //If user id not equal to path variable, throw error
        if(!Objects.equals(user.user_id(), user_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        repository.save(user);
    }

    //Delete a user
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{user_id}")
    public void delete(@PathVariable Integer user_id) {
        repository.deleteById(user_id);
        //if user id not found, throw error
        if(!repository.existsById(user_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

}


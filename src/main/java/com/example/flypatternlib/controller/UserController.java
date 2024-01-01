package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.User;
import com.example.flypatternlib.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
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
}

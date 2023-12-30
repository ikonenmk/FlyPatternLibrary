package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.User;
import com.example.flypatternlib.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}

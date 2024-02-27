package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.UserPattern;
import com.example.flypatternlib.repository.UserPatternRepository;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/userpattern")
public class userPatternController {

    private final UserPatternRepository repository;

    public userPatternController(UserPatternRepository repository) {
        this.repository = repository;
    }
    //Add new relation between user and pattern
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void add(@RequestBody UserPattern userPattern) {
        repository.save(userPattern);
    }

    //Delete
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{user_pattern_id}")
    public void delete(@PathVariable Integer user_pattern_id) {
        //thrown error if id not found
        if(!repository.existsById(user_pattern_id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "userpattern id not found");
        }
        repository.deleteById(user_pattern_id);
    }
}

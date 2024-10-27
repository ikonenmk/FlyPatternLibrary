package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.UserPattern;
import com.example.flypatternlib.repository.UserPatternRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
@RequestMapping("/api/userpattern")
public class userPatternController {

    private final UserPatternRepository userPatternRepository;

    public userPatternController(UserPatternRepository userPatternRepository) {
        this.userPatternRepository = userPatternRepository;
    }
    // Return all patterns
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void add(@RequestBody UserPattern userPattern) {
        userPatternRepository.save(userPattern);
    }

    //Delete
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{user_pattern_id}")
    public void delete(@PathVariable Integer user_pattern_id) {
        //thrown error if id not found
        if(!userPatternRepository.existsById(user_pattern_id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "userpattern id not found");
        }
        userPatternRepository.deleteById(user_pattern_id);
    }
}

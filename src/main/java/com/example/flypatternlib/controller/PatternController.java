package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.Pattern;
import com.example.flypatternlib.repository.PatternRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/pattern")
public class PatternController {

    private final PatternRepository repository;

    public PatternController(PatternRepository repository) {
        this.repository = repository;
    }

    //Find all patterns in database
    @GetMapping
    public List<Pattern> findAll() {

        return repository.findAll();
    }

    //Add a new pattern
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void add(@RequestBody Pattern pattern) {
        repository.save(pattern);
    }

    //Delete a pattern
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{pattern_id}")
    public void delete(@PathVariable Integer pattern_id) {
        repository.deleteById(pattern_id);
    }

    //Update a pattern
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{pattern_id}")
    public void update(@RequestBody Pattern pattern, @PathVariable Integer pattern_id) {
        //If pattern id not in DB, throw error
        if(!repository.existsById(pattern_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pattern not found.");
        }
        //If pattern id in request body does not match path variable, throw error
        if(!Objects.equals(pattern.pattern_id(), pattern_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pattern not found.");
        }
        repository.save(pattern);
    }


}

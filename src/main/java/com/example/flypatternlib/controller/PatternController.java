package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.Pattern;
import com.example.flypatternlib.repository.PatternRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

}

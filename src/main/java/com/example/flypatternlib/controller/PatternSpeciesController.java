package com.example.flypatternlib.controller;

import com.example.flypatternlib.repository.PatternSpeciesRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patternspecies")
public class PatternSpeciesController {
    private final PatternSpeciesRepository repository;

    public PatternSpeciesController(PatternSpeciesRepository repository) {
        this.repository = repository;
    }
}

package com.example.flypatternlib.controller;

import com.example.flypatternlib.repository.PatternMaterialRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patternmaterial")
public class PatternMaterialController {
    private final PatternMaterialRepository repository;

    public PatternMaterialController(PatternMaterialRepository repository) {
        this.repository = repository;
    }
}

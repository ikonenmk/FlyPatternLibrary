package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.PatternMaterial;
import com.example.flypatternlib.repository.PatternMaterialRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/patternmaterial")
public class PatternMaterialController {
    private final PatternMaterialRepository repository;

    public PatternMaterialController(PatternMaterialRepository repository) {
        this.repository = repository;
    }

    //Add new relation between pattern and material
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void add(@RequestBody PatternMaterial patternMaterial) {
        repository.save(patternMaterial);
    }

    //Delete
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{pattern_material_id}")
    public void delete(@PathVariable Integer pattern_material_id) {
        //throw error if id does not exist
        if(!repository.existsById(pattern_material_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "pattermaterial id not found");
        }
        repository.deleteById(pattern_material_id);
    }
}

package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.Species;
import com.example.flypatternlib.repository.SpeciesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/species")
public class SpeciesController {

    private final SpeciesRepository repository;

    public SpeciesController(SpeciesRepository repository) {
        this.repository = repository;
    }

    //Find all species
    @GetMapping
    public List<Species> findAll() {
        return repository.findAll();
    }

    //Add a new species
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void add(@RequestBody Species species) {
        repository.save(species);
    }

    //Delete species
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{species_id}")
    public void delete(@PathVariable Integer species_id) {
        //throw error if species id not found
        if(!repository.existsById(species_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Species not found");
        }
        repository.deleteById(species_id);
    }
}

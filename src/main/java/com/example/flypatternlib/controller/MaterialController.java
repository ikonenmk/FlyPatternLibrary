package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.Material;
import com.example.flypatternlib.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AutoConfiguration
@RestController
@RequestMapping("/api/material")
public class MaterialController {

    private final MaterialRepository repository;

    public MaterialController(MaterialRepository repository) {
        this.repository = repository;
    }

    //Find all materials in db
    @GetMapping
    public List<Material> findAll() {
        return repository.findAll();
    }

    //Add a new material
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void add(@RequestBody Material material) {
        repository.save(material);
    }

    //Delete material
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{material_id}")
    public void delete(@PathVariable Integer material_id) {
        //throw error if species id not found
        if(!repository.existsById(material_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Species not found.");
        }
        repository.deleteById(material_id);
    }
}

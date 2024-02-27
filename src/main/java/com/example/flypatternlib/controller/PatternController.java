package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.Material;
import com.example.flypatternlib.model.Pattern;
import com.example.flypatternlib.model.Species;
import com.example.flypatternlib.repository.MaterialRepository;
import com.example.flypatternlib.repository.PatternRepository;
import com.example.flypatternlib.repository.SpeciesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/pattern")
public class PatternController {

    private final PatternRepository patternRepository;
    private final MaterialRepository materialRepository;
    private final SpeciesRepository speciesRepository;

    public PatternController(PatternRepository patternRepository, MaterialRepository materialRepository, SpeciesRepository speciesRepository) {
        this.patternRepository = patternRepository;
        this.materialRepository = materialRepository;
        this.speciesRepository = speciesRepository;
    }

    //Find all patterns in database
    @GetMapping
    public List<Pattern> findAll() {

        return patternRepository.findAll();
    }


    //Add a new pattern
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void add(@RequestBody Pattern pattern, @RequestParam Integer species_id, @RequestParam Integer material_id) {
        Material material = materialRepository.findById(material_id)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "material not found"));
        Species species = speciesRepository.findById(species_id)
                        .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "species not found"));
        pattern.addMaterial(material);
        pattern.addSpecies(species);
        patternRepository.save(pattern);
    }

    //Delete a pattern
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{pattern_id}")
    public void delete(@PathVariable Integer pattern_id) {
        //if pattern id not found, throw error
        if(!patternRepository.existsById(pattern_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pattern not found");
        }
        patternRepository.deleteById(pattern_id);
    }

    //Update a pattern
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{pattern_id}")
    public void update(@RequestBody Pattern pattern, @PathVariable Integer pattern_id) {
        //If pattern id not in DB, throw error
        if(!patternRepository.existsById(pattern_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pattern not found.");
        }
        //If pattern id in request body does not match path variable, throw error
        if(!Objects.equals(pattern.getId(), pattern_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pattern not found.");
        }
        patternRepository.save(pattern);
    }


}

package com.example.flypatternlib.controller;

import com.example.flypatternlib.DTO.FlyTypeDTO;
import com.example.flypatternlib.model.Pattern;
import com.example.flypatternlib.repository.MaterialRepository;
import com.example.flypatternlib.repository.PatternRepository;
import com.example.flypatternlib.repository.SpeciesRepository;
import com.example.flypatternlib.service.PatternService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class PatternController {

    private final PatternRepository patternRepository;
    private final MaterialRepository materialRepository;
    private final SpeciesRepository speciesRepository;
    private final PatternService patternService;

    // file directory for images
    private final String UPLOAD_DIR = "C:/uploads/images/";

    public PatternController(PatternRepository patternRepository, MaterialRepository materialRepository, SpeciesRepository speciesRepository, PatternService patternService) {
        this.patternRepository = patternRepository;
        this.materialRepository = materialRepository;
        this.speciesRepository = speciesRepository;
        this.patternService = patternService;
    }

    //Find all patterns in database
    @GetMapping("/pattern/find")
    public List<Pattern> findAll() {

        return patternRepository.findAll();
    }


    //Add a new pattern
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void add(@RequestBody Pattern pattern, @RequestParam("speciesArray") String[] speciesArray, @RequestParam("materialsArray") String[] materialsArray) {
        //Add pattern to DB
        patternService.addPattern(pattern, speciesArray, materialsArray);
    }

    // Find a pattern based on id
    @GetMapping("/pattern/{pattern_id}")
    public Optional<Pattern> findPattern(@PathVariable Integer pattern_id) {
        return patternRepository.findById(pattern_id);
    }

    //Delete a pattern
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/pattern//{pattern_id}")
    public void delete(@PathVariable Integer pattern_id) {
        //if pattern id not found, throw error
        if(!patternRepository.existsById(pattern_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pattern not found");
        }
        patternRepository.deleteById(pattern_id);
    }

    //Update a pattern
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/pattern/{pattern_id}")
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

    //Find all types
    @GetMapping("/pattern/types")
    public List<FlyTypeDTO> findAllTypes() {
        return patternService.findAllTypes();
    }

    // Endpoint for uploading image
    @PostMapping("/pattern/uploadimage")
    public ResponseEntity<String> imageUpload(@RequestParam MultipartFile file) {
        try {
            File directory = new File(UPLOAD_DIR);
            // Check if dir exists
            if (!directory.exists()) {
                boolean dirCreated = directory.mkdirs();
                if (!dirCreated) {
                    throw new IOException("Failed to create directory: " + UPLOAD_DIR);
                }
            }

            String filePath = UPLOAD_DIR + file.getOriginalFilename();

            file.transferTo(new File(filePath));

            return ResponseEntity.ok("File uploaded");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload failed: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected error occurred: " + e.getMessage());
    }
    }

    // Find by name
    @GetMapping("/name")
    public List<Pattern> findAllNames() {
        return patternRepository.findAll();
    }


}

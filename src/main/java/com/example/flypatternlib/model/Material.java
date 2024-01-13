package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public record Material (
        @Id
        Integer material_id,
        String name,
        List<Pattern> patterns //Collection of patterns using this material

){
}

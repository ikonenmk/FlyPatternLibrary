package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

public record PatternSpecies(
        @Id
        Integer id,
        Integer pattern_id,
        Integer species_id
) {
}
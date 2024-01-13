package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public record Species (
        @Id
        Integer species_id,
        String name,
        List<Pattern> patterns //Collection of patterns tied for this species
){
}

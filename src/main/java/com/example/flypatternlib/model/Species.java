package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

public record Species (
        @Id
        Integer species_id,
        String name
){
}

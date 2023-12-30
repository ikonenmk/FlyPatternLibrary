package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

public record Material (
        @Id
        Integer material_id,
        String name

){
}

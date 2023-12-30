package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

public record PatternMaterial(
        @Id
        Integer id,
        Integer pattern_id,
        Integer material_id
) {
}

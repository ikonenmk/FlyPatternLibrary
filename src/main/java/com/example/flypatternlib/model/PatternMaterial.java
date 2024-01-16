package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

public class PatternMaterial {
        @Id
        Integer material;

        PatternMaterial(Integer material) {
                this.material = material;
        }
}

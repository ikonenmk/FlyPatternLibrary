package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

public class PatternSpecies {
        @Id
        Integer species;
        PatternSpecies(Integer species) {
                this.species = species;
        }
}

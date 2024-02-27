package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

@Table
public class PatternSpecies {
        @Id
        Integer species;
        PatternSpecies(Integer species) {
                this.species = species;
        }
}

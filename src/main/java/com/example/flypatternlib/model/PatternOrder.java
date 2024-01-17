package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

public class PatternOrder {
        @Id
        Integer pattern;

    public PatternOrder(Integer pattern) {
        this.pattern = pattern;
    }
}

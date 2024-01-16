package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

public class UserPattern {
    @Id
    Integer pattern;

    UserPattern(Integer pattern) {
        this.pattern = pattern;
    }
}

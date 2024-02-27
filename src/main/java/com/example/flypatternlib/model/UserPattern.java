package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

@Table
public class UserPattern {
    @Id
    Integer pattern;

    UserPattern(Integer pattern) {
        this.pattern = pattern;
    }
}

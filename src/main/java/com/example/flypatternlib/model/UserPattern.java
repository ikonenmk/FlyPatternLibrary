package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

public record UserPattern (
    @Id
    Integer user_pattern_id,
    Integer pattern_id,
    Integer user_id
        ){ }

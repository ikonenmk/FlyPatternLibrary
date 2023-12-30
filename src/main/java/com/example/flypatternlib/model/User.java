package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

public record User (
    @Id
    Integer user_id,
    String email,
    String username,
    String password
)
{}

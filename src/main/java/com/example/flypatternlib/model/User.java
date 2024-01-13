package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public record User (
    @Id
    Integer user_id,
    String email,
    String username,
    String password,
    List<UserPattern> patterns //Collection of patterns in user's lib
)
{}

package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

import java.time.LocalDate;

public record UserOrder(
        @Id
        Integer id,
        Integer total_cost,
        LocalDate date,
        AggregateReference<User, Integer> user
) { }

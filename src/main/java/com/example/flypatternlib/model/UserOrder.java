package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

import java.time.LocalDate;

public record UserOrder(
        @Id
        Integer order_id,
        Integer total_cost,
        LocalDate date,
        Integer user_id
) {
}

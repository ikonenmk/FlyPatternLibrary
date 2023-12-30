package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

public record PatternOrder(
        @Id
        Integer id,
        Integer pattern_id,
        Integer order_id
) {
}

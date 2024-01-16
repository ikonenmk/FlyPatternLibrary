package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

public record PatternOrder(
        @Id
        Integer id,
        AggregateReference<Pattern, Integer> pattern,
        AggregateReference<UserOrder, Integer> order
) {
}

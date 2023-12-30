package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record Pattern (
    @Id
    Integer pattern_id,
    String name,
    String descr,
    String instr,
    Integer hook_size,
    String type,
    String img_url,
    Boolean for_sale,
    Integer price,
    LocalDateTime created,
    Integer user_id

    ) {

}

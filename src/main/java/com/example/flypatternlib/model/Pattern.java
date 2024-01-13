package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.List;

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
    Integer user_id,
    List<UserPattern> users, //Collection of users having pattern in lib
    List<PatternMaterial> materials, //Collection of materials in pattern
    List<PatternSpecies> species //Collection of species pattern is tied for

    ) {

}

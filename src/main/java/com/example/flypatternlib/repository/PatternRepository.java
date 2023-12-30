package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.Pattern;
import org.springframework.data.repository.ListCrudRepository;

public interface PatternRepository extends ListCrudRepository<Pattern, Integer> {
}

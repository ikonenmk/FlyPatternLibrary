package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.Pattern;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatternRepository extends ListCrudRepository<Pattern, Integer> {
}

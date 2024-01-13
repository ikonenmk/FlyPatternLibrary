package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.UserPattern;
import org.springframework.data.repository.ListCrudRepository;

public interface UserPatternRepository extends ListCrudRepository<UserPattern, Integer> {
}

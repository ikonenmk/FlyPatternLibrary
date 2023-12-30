package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.PatternSpecies;
import org.springframework.data.repository.ListCrudRepository;

public interface PatternSpeciesRepository extends ListCrudRepository<PatternSpecies, Integer> {
}

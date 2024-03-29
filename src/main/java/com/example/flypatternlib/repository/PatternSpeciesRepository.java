package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.PatternSpecies;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatternSpeciesRepository extends ListCrudRepository<PatternSpecies, Integer> {
}

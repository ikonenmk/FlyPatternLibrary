package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.Species;
import org.springframework.data.repository.ListCrudRepository;

public interface SpeciesRepository extends ListCrudRepository<Species, Integer> {
}

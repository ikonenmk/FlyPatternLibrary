package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.PatternMaterial;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PatternMaterialRepository extends ListCrudRepository<PatternMaterial, Integer> {
}

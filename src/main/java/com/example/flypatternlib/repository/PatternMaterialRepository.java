package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.PatternMaterial;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PatternMaterialRepository extends ListCrudRepository<PatternMaterial, Integer> {
}

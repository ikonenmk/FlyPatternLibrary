package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.Material;
import org.springframework.data.repository.ListCrudRepository;

public interface MaterialRepository extends ListCrudRepository<Material, Integer> {
}

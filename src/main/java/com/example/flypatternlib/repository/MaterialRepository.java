package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.Material;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MaterialRepository extends ListCrudRepository<Material, Integer> {
}

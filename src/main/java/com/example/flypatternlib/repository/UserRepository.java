package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.User;
import org.springframework.data.repository.ListCrudRepository;

public interface UserRepository extends ListCrudRepository<User, Integer> {
}

package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.User;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends ListCrudRepository<User, Integer> {
     User findByEmail(String email);
}

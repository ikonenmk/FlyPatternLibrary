package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.User;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends ListCrudRepository<User, Integer> {

    // Find user by username
    @Query("select username from users u where u.username = :username")
    String findByUserName(String username);

    // Return user data
    @Query("select * from users u where u.username = :username")
    Optional<User> returnUser(String username);
}

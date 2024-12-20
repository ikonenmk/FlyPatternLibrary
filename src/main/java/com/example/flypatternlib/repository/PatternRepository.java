package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.Pattern;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PatternRepository extends ListCrudRepository<Pattern, Integer> {

    //Find pattern by type
    @Query("select type from pattern p where p.type = :type")
    List<Pattern> findByType(@Param("type") String type);

    //Find all types of fly
    @Query("select type from pattern")
    List<String> findAllTypes();

    // Find flies by name
    @Query("select * from pattern p where p.name = :name")
    List<Pattern> findByName(@Param("name") String name);

    // Find patterns based on created by username
    @Query("select * from pattern p where p.created_by_user =:username")
    List<Pattern> findCreatedByUserName(String username);
}

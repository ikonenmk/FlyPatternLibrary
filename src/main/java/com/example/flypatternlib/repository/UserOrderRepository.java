package com.example.flypatternlib.repository;

import com.example.flypatternlib.model.UserOrder;
import org.springframework.data.repository.ListCrudRepository;

public interface UserOrderRepository extends ListCrudRepository<UserOrder, Integer> {
}

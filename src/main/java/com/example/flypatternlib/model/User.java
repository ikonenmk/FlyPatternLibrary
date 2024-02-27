package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.util.Assert;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Table
public class User {
    @Id
    private Integer id;
    private String email;
    private String username;
    private String password;
    private final Set<UserPattern> patterns = new HashSet<>(); //Patterns that user has added in library
    private final Set<UserOrder> orders = new HashSet<>();
    public void addPattern(Pattern pattern) {
        this.patterns.add(new UserPattern(pattern.getId()));
    }

    public void addOrder(UserOrder orders)
    {
        this.orders.add(orders);
    }

    /*private UserPattern createUserPattern(Pattern pattern) {
        Assert.notNull(pattern, "Pattern cannot be null");
        Assert.notNull(pattern.getId(), "Pattern id cannot be null");

        UserPattern userPattern = new UserPattern();
        userPattern.pattern = pattern.getId();
        return userPattern;
    }*/

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

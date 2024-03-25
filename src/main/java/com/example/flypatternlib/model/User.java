package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import java.util.HashSet;
import java.util.Set;
@Table
public class User {
    @Id
    private String username;
    private String password;
    private boolean enabled;
    private final Set<UserPattern> patterns = new HashSet<>(); //Patterns that user has added in library
    private final Set<UserOrder> orders = new HashSet<>();

    public void addPattern(Pattern pattern) {
        this.patterns.add(new UserPattern(pattern.getId()));
    }

    public void addOrder(UserOrder orders) {
        this.orders.add(orders);
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

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}


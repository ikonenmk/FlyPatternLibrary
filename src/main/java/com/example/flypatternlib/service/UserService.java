package com.example.flypatternlib.service;

import com.example.flypatternlib.model.UserRegRequest;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final JdbcUserDetailsManager jdbcUserDetailsManager;
    private final PasswordEncoder passwordEncoder;

    public UserService(JdbcUserDetailsManager jdbcUserDetailsManager, PasswordEncoder passwordEncoder) {
        this.jdbcUserDetailsManager = jdbcUserDetailsManager;
        this.passwordEncoder = passwordEncoder;
    }

    public void addUser(UserRegRequest loginRequest) {
        UserDetails newUser = User.builder()
                .username(loginRequest.username())
                .password(passwordEncoder.encode(loginRequest.password()))
                .roles("USER")
                .build();
        jdbcUserDetailsManager.createUser(newUser);

    }

    // Method for looking up if a username exists, returns true or false
    public boolean findUser(String username) {
        try {
           UserDetails user = jdbcUserDetailsManager.loadUserByUsername(username);
           return true;
        } catch (UsernameNotFoundException error) {
            System.out.println(error.getMessage());
            return false;
        }
    }

}

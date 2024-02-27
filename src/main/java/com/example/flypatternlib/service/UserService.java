package com.example.flypatternlib.service;

import com.example.flypatternlib.model.UserRegRequest;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Service;

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

}

package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.UserRegRequest;
import com.example.flypatternlib.model.Pattern;
import com.example.flypatternlib.model.User;
import com.example.flypatternlib.repository.PatternRepository;
import com.example.flypatternlib.repository.UserOrderRepository;
import com.example.flypatternlib.repository.UserRepository;
import com.example.flypatternlib.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserRepository userRepository;
    private final PatternRepository patternRepository;
    private final UserOrderRepository orderRepository;
    private final UserService userService;
    private final JdbcUserDetailsManager jdbcUserDetailsManager;

    public UserController(UserRepository repository, PatternRepository patternRepository, UserOrderRepository orderRepository, UserService userService, JdbcUserDetailsManager jdbcUserDetailsManager) {
        this.userRepository = repository;
        this.patternRepository = patternRepository;
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.jdbcUserDetailsManager = jdbcUserDetailsManager;
    }

    //Register a new user
    @CrossOrigin
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public void register(@RequestBody UserRegRequest userRegRequest) {
        userService.addUser(userRegRequest);
    }


    @CrossOrigin
    @GetMapping("/finduser")
    public Boolean findById(@RequestParam String username) {
        // Check if username exists, returns true or false
        return userService.findUser(username);
    }

    //Update user


    //Delete a user


    //Add pattern to User's library
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @GetMapping("/addpattern")
    public void addToLib(@RequestParam Integer user_id, @RequestParam Integer pattern_id) {
        //if user id not found, throw error
        if(!userRepository.existsById(user_id) || !patternRepository.existsById(pattern_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        //Find user
        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        //Find pattern
        Pattern pattern = patternRepository.findById(pattern_id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pattern not found"));
        //Add reference between user and pattern
        user.addPattern(pattern);
        userRepository.save(user);


    }


}


package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.Pattern;
import com.example.flypatternlib.model.User;
import com.example.flypatternlib.model.UserOrder;
import com.example.flypatternlib.repository.PatternRepository;
import com.example.flypatternlib.repository.UserOrderRepository;
import com.example.flypatternlib.repository.UserRepository;
import org.springframework.http.HttpStatus;
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

    public UserController(UserRepository repository, PatternRepository patternRepository, UserOrderRepository orderRepository) {
        this.userRepository = repository;
        this.patternRepository = patternRepository;
        this.orderRepository = orderRepository;
    }

    //Add a new user
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void add(@RequestBody User user) {
        userRepository.save(user);
    }

    //Find user by id
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @GetMapping("/{user_id}")
    public Optional<User> findById(@PathVariable Integer user_id) {

        //Search for user id, return only if Optional<User> is non-empty
        Optional<User> foundUser = userRepository.findById(user_id);
        if (foundUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        } else {
            return foundUser;
        }
    }

    //Update user
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{user_id}")
    public void update(@RequestBody User user, @PathVariable Integer user_id) {
        //if user not found in db, throw error
        if(!userRepository.existsById(user_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }
        //If user id not equal to path variable, throw error
        if(!Objects.equals(user.getId(), user_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        userRepository.save(user);
    }

    //Delete a user
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{user_id}")
    public void delete(@PathVariable Integer user_id) {
        //if user id not found, throw error
        if(!userRepository.existsById(user_id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        userRepository.deleteById(user_id);
    }

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


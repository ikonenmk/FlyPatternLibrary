package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.UserRegRequest;
import com.example.flypatternlib.service.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController {


    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    public AuthController(TokenService tokenService, AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    //Endpoint for JWT token
    @PostMapping("/token")
    public String token(@RequestBody UserRegRequest userLogin) {
        //Authenticate using username and password
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogin.username(), userLogin.password()));
            System.out.println("Authentication created successfully");
            return tokenService.generateToken(authentication);
        } catch (AuthenticationException e) {
            System.out.println("Authentication failed: " +e.getMessage());
            throw e;
        }
    }
}

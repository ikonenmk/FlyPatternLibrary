package com.example.flypatternlib.controller;

import com.example.flypatternlib.model.UserRegRequest;
import com.example.flypatternlib.service.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequestMapping("/api/auth")
public class AuthController {


    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    public AuthController(TokenService tokenService, AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    //Endpoint for JWT token
    @CrossOrigin
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

    //Endpoint for validating token
    @CrossOrigin
    @GetMapping("/validate")
    public Boolean validateToken(@RequestParam String token) {
        System.out.println("Token is: " + token);
        Boolean isValid = tokenService.validateToken(token);
        System.out.println("Token is = " + isValid);
        return isValid;
    }

    //Endpoint for returning username
    @CrossOrigin
    @GetMapping("/username")
    public String home(Principal principal) {
        return principal.getName();
    }

}


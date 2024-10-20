package com.example.flypatternlib.service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;


@Service
public class TokenService {

    private final JwtEncoder encoder;
    private final JwtDecoder decoder;

    public TokenService(JwtEncoder encoder, JwtDecoder decoder) {
        this.encoder = encoder;
        this.decoder = decoder;
    }

    //Method that takes in authenticated user and returns a JWT
    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    //Method that validates a JWT string
    public Boolean validateToken(String token) {
        try {
            //Decode token string
            Jwt jwt = decoder.decode(token);
            //Create time stamp
            Instant now = Instant.now();
            //Get expiration time for JWT
            Instant expirationTime = jwt.getExpiresAt();
            //Return true if token exists and has not expired
            return expirationTime != null && !expirationTime.isBefore(now);
        } catch (Exception e) {
            System.out.println("Token validation failed: " + e);
            return false;
            }

    }


}

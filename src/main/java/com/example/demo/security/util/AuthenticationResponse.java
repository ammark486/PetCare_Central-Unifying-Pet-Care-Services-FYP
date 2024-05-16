package com.example.demo.security.util;

import com.example.demo.dto.UserDetailsDto;
import lombok.Getter;

@Getter

public class AuthenticationResponse {
    private final String jwt;
    private UserDetailsDto userDetailsDto;

    public AuthenticationResponse(String jwt, UserDetailsDto userDetailsDto) {
        this.jwt = jwt;
        this.userDetailsDto = userDetailsDto;
    }

    public String getJwt() {
        return jwt;
    }

    public UserDetailsDto getUserDetailsDto() {
        return userDetailsDto;
    }
}

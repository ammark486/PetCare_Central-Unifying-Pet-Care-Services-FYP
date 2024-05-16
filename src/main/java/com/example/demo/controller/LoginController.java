package com.example.demo.controller;

import com.example.demo.dto.LoginCredential;
import com.example.demo.dto.UserDetailsDto;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.security.util.AuthenticationResponse;
import com.example.demo.security.util.JwtUtil;
import com.example.demo.service.MyUserDetailService;
import com.example.demo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private MyUserDetailService myUserDetailService;
    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginCredential loginCredentials) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginCredentials.getUserName(),loginCredentials.getPassword())
            );
        }
        catch(BadCredentialsException e){
            logger.warn("User Not found....");
            throw new Exception("Incorrect Username or Password ! ",e);
        }

        UserDetails userDetails = myUserDetailService.loadUserByUsername(loginCredentials.getUserName());
        User user = this.userService.getUserByUserName(userDetails.getUsername());
        List<Role> roleList = new ArrayList<>(user.getRoles());
        String jwtToken = jwtUtil.generateToken(userDetails);
        UserDetailsDto userDetailsDto = new UserDetailsDto();
        userDetailsDto.setUserName(userDetails.getUsername());
        userDetailsDto.setId(user.getId());
        userDetailsDto.setRole(roleList.get(0).getName());
        userDetailsDto.setPermissions(this.userService.getUserPermissions(roleList.get(0).getId()));

        return ResponseEntity.ok(new AuthenticationResponse(jwtToken, userDetailsDto));
    }
}
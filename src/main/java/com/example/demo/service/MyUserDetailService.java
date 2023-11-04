package com.example.demo.service;

import com.example.demo.dto.CustomUserDetail;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {

        User user = userRepository.findByName(username);
        if(user == null){
            throw new RuntimeException("Wrong Credentials"+username);
        }
        return new CustomUserDetail(user);
    }

}

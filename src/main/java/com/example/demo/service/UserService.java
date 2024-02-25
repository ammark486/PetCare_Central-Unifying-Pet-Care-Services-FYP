package com.example.demo.service;
import com.example.demo.constants.StatusCode;
import com.example.demo.dto.UserDto;
import com.example.demo.exception.RecordAlreadyExistException;
import com.example.demo.exception.RecordNotSavedException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.util.Message;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    ModelMapper modelMapper;

    public Message<UserDto> save(UserDto user){
            if(this.userRepository.findByUserName(user.getUserName()) ==  null){
                User saveUser = this.userRepository.save(User.builder()
                        .userName(user.getUserName())
                        .status(true)
                        .password(bCryptPasswordEncoder.encode(user.getPassword()))
                        .build());
                saveUser.setPassword(null);
                Message<UserDto> message = new Message<>();
                message.setMessage("Signup successfully");
                message.setCode(StatusCode.OK.name());
                message.setStatus(StatusCode.OK.value());
                message.setData(this.modelMapper.map(saveUser, UserDto.class));
                return message;
            }else {
                throw new RecordAlreadyExistException("Username already exist");
            }
    }
}

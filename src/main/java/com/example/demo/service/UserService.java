package com.example.demo.service;
import com.example.demo.constants.StatusCode;
import com.example.demo.constants.UserRoles;
import com.example.demo.dto.UserDto;
import com.example.demo.exception.RecordAlreadyExistException;
import com.example.demo.exception.RecordNotSavedException;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.util.Message;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private RoleService roleService;
    @Autowired
    ModelMapper modelMapper;

    public Message<UserDto> save(UserDto user){
            if(this.userRepository.findByUserName(user.getUserName()) ==  null){
                User saveUser = this.userRepository.save(User.builder()
                        .userName(user.getUserName())
                        .status(true)
                        .registrationDate(LocalDate.now())
                        .password(bCryptPasswordEncoder.encode(user.getPassword()))
                        .roles(this.fetchUserRoles(UserRoles.ROLE_CUSTOMER))
                        .build());
                saveUser.setPassword(null);
                Message<UserDto> message = new Message<>();
                message.setMessage("Signup successfully");
                message.setCode(StatusCode.OK.name());
                message.setStatus(StatusCode.OK.value());
                message.setData(this.modelMapper.map(saveUser, UserDto.class));
                return message;
            }else {
                throw new RecordAlreadyExistException("Email already exist");
            }
    }

    public User findByUserName(String userName){
        return this.userRepository.findByUserName(userName);
    }

    public Long countAllUsers(){
        return this.userRepository.count();
    }

    public Long countAllUsersByYear(String year){
        return this.userRepository.countAllUsersByYear(year);
    }

    public Set<Role> fetchUserRoles(String role){
        Set<Role> roles = new HashSet<>();
        roles.add(this.roleService.getRoleByName(role));
        return roles;
    }
}

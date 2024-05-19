package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/sign-up")
    ResponseEntity<Message<UserDto>> user(@RequestBody UserDto user){
        return ResponseEntity.ok(this.userService.save(user));
    }

    @GetMapping("/user/role")
    ResponseEntity<Message<List<User>>> getUsersByRole(@RequestParam String role){
       return ResponseEntity.ok(this.userService.getUsersByRole(role));
    }

    @GetMapping("/user/{id}")
    ResponseEntity<Message<User>> getUsersByById(@PathVariable Long id){
        return ResponseEntity.ok(this.userService.getUsersByById(id));
    }
}

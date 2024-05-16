package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.model.Permission;
import com.example.demo.model.Role;
import com.example.demo.repository.RoleRepository;
import com.example.demo.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

    public Role getRoleByName(String role) {
        return this.roleRepository.findByName(role);
    }

    public Role getRoleById(Long id) {
        return this.roleRepository.findById(id).get();
    }


    public Message<List<Role>> getAllRoles() {
        Message<List<Role>> message = new Message<>();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("product save successfully");
        message.setData(this.roleRepository.findAll());
        return message;
    }

}

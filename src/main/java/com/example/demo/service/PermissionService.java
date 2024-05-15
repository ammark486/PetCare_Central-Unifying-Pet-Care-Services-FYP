package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.dto.ProductDto;
import com.example.demo.dto.RolePermissionDto;
import com.example.demo.model.Permission;
import com.example.demo.model.Role;
import com.example.demo.model.RolePermission;
import com.example.demo.repository.PermissionRepo;
import com.example.demo.repository.RolePermissionRepo;
import com.example.demo.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class PermissionService {

    @Autowired
    RoleService roleService;
    @Autowired
    PermissionRepo permissionRepo;
    @Autowired
    RolePermissionService rolePermissionService;

    public Message<List<RolePermission>> assignPermissionToRole(List<RolePermissionDto> rolePermissionDtos) {
        List<RolePermission> rolePermissions = new ArrayList<>();
        for(RolePermissionDto rolePermissionDto: rolePermissionDtos){
            Role role = this.roleService.getRoleById(rolePermissionDto.getRoleId());
            Permission permission = this.permissionRepo.findById(rolePermissionDto.getPermissionId()).get();
            RolePermission rolePermission = this.rolePermissionService.findByRoleAndPermissionId(rolePermissionDto.getRoleId(), rolePermissionDto.getPermissionId());
            if(Objects.isNull(rolePermission)){
                rolePermission = new RolePermission();
                rolePermission.setActive(false);
                rolePermission.setPermission(permission);
                rolePermission.setRole(role);
            }else{
                rolePermission.setActive(rolePermissionDto.getActive());
                rolePermission.setPermission(permission);
                rolePermission.setRole(role);
            }

            rolePermissions.add(rolePermission);

        }
        List<RolePermission> savedRolePermissions = this.rolePermissionService.assignPermissionToRole(rolePermissions);
        Message<List<RolePermission>> message = new Message<>();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("product save successfully");
        message.setData(savedRolePermissions);
        return message;
    }

    public Message<List<Permission>> savePermissions(List<Permission> permissions) {
        Message<List<Permission>> message = new Message<>();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("product save successfully");
        message.setData(this.permissionRepo.saveAll(permissions));
        return message;
    }

    public Message<List<RolePermission>> getAllPermissionsByRole(Long id) {
        List<RolePermission> rolePermissions = this.rolePermissionService.findByRoleId(id);
        Message<List<RolePermission>> message = new Message<>();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("product save successfully");
        message.setData(rolePermissions);
        return message;
    }
}

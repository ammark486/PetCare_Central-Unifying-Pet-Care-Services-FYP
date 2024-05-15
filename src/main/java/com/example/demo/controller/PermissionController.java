package com.example.demo.controller;

import com.example.demo.dto.RolePermissionDto;
import com.example.demo.model.Permission;
import com.example.demo.model.Role;
import com.example.demo.model.RolePermission;
import com.example.demo.service.PermissionService;
import com.example.demo.service.RoleService;
import com.example.demo.util.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PermissionController {
    private final PermissionService permissionService;
    private final RoleService roleService;

    public PermissionController(PermissionService permissionService, RoleService roleService) {
        this.permissionService = permissionService;
        this.roleService = roleService;
    }

    @PostMapping("/permission")
    ResponseEntity<Message<List<Permission>>> savePermissions(@RequestBody List<Permission> permissions){
        return ResponseEntity.ok(this.permissionService.savePermissions(permissions));
    }

    @PostMapping("/permission/role")
    ResponseEntity<Message<List<RolePermission>>> assignPermissionToRole(@RequestBody List<RolePermissionDto> rolePermissionDtos){
        return ResponseEntity.ok(this.permissionService.assignPermissionToRole(rolePermissionDtos));
    }

    @GetMapping("/role")
    ResponseEntity<Message<List<Role>>> getAllRoles(){
        return ResponseEntity.ok(this.roleService.getAllRoles());
    }

    @GetMapping("/permission/role/{id}")
    ResponseEntity<Message<List<RolePermission>>> getAllPermissions(@PathVariable Long id){
        return ResponseEntity.ok(this.permissionService.getAllPermissionsByRole(id));
    }
}

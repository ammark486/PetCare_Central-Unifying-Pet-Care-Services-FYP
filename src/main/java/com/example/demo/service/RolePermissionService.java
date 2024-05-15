package com.example.demo.service;

import com.example.demo.model.Role;
import com.example.demo.model.RolePermission;
import com.example.demo.repository.RolePermissionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolePermissionService {

    @Autowired
    RolePermissionRepo rolePermissionRepo;
    public List<RolePermission> assignPermissionToRole(List<RolePermission> rolePermissions) {
        return this.rolePermissionRepo.saveAll(rolePermissions);
    }

    RolePermission findByRoleAndPermissionId(Long roleId, Long permissionId){
        RolePermission rolePermission = this.rolePermissionRepo.findByRoleAndPermissionId(roleId, permissionId);
        return rolePermission;
    }

    List<RolePermission> findByRoleId(Long roleId){
        List<RolePermission> rolePermissions = this.rolePermissionRepo.findByRoleId(roleId);
        return rolePermissions;
    }
}

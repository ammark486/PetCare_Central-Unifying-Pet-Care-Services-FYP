package com.example.demo.repository;

import com.example.demo.model.RolePermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RolePermissionRepo extends JpaRepository<RolePermission, Long> {

    @Query(value = "select rp from RolePermission rp where rp.role.id = :roleId AND rp.permission.id = :permissionId")
    RolePermission findByRoleAndPermissionId(Long roleId, Long permissionId);

    @Query(value = "select rp from RolePermission rp where rp.role.id = :roleId")
    List<RolePermission> findByRoleId(Long roleId);
}

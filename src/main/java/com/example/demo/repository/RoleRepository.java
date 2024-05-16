package com.example.demo.repository;

import com.example.demo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.Id;
import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String role);

}

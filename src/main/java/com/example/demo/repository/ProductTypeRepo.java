package com.example.demo.repository;

import com.example.demo.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductTypeRepo extends JpaRepository<ProductType, Long> {
    List<ProductType> findAllByTypeAndIsActive(String type, Boolean isActive);
    List<ProductType> findAllByIsActive(Boolean isActive);
}

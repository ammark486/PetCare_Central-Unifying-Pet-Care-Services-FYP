package com.example.demo.repository;

import com.example.demo.dto.CategoryDto;
import com.example.demo.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
    List<Category> findAllByIsActive(Boolean isActive);

    Optional<Category> findByIsActiveAndId(Boolean isActive, Long id);

    Category findByName(String name);

    @Query(value = "select c from Category c where c.productType.id = :productTypeId")
    List<Category> findCategoriesByProductTypeId(Long productTypeId);
}

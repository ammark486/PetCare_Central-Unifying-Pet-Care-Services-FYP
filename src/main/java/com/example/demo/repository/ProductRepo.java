package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findAllByIsActive(Boolean isActive);
    Product findByIsActiveAndId(Boolean isActive, Long id);

    @Query(value = "SELECT sum(p.price) as total FROM Product p where p.id IN :productIds")
    Integer sumOfProducts(@Param("productIds") List<Long> productIds);
}

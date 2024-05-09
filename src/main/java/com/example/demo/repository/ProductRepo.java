package com.example.demo.repository;

import com.example.demo.dto.ProductDto;
import com.example.demo.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findAllByIsActive(Boolean isActive);
    @Query(value = "SELECT new com.example.demo.dto.ProductDto(p.id, p.name, p.price, p.imageUrl, p.description, p.age, p.breed, p.color, p.isActive, pt.type as productType, c.id as categoryId, pt.id as productTypeId)" +
            " FROM Product p INNER JOIN p.category c INNER JOIN c.productType pt WHERE p.id = :id")
    ProductDto findByProductId(Long id);

    @Query(value = "SELECT sum(p.price) as total FROM Product p where p.id IN :productIds")
    Integer sumOfProducts(@Param("productIds") List<Long> productIds);

    @Query(value = "SELECT new com.example.demo.dto.ProductDto(p.id, p.name, p.price, p.imageUrl, p.description, p.age, p.breed, p.color, p.isActive, pt.type as productType, c.id as categoryId, pt.id as productTypeId)" +
            " FROM Product p INNER JOIN p.category c INNER JOIN c.productType pt WHERE p.category.id = :id AND p.isActive = :isActive")
    Page<ProductDto> findByCategoryId(Long id, Boolean isActive, Pageable pageable);

//    "INNER JOIN pet.product_type pt ON c.product_type_id = pt.id;
}

package com.example.demo.dto;

import com.example.demo.model.Category;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private Double price;
    private String imageUrl;
    private String description;
    private String age;
    private String breed;
    private String color;
    private Boolean isActive;
    private String productType;
    private Long categoryId;
    private Long productTypeId;

    public ProductDto(Long id, String name, Double price, String imageUrl, String description, String age, String breed, String color, Boolean isActive, String productType, Long categoryId, Long productTypeId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.age = age;
        this.breed = breed;
        this.color = color;
        this.isActive = isActive;
        this.productType = productType;
        this.categoryId = categoryId;
        this.productTypeId = productTypeId;
    }
}

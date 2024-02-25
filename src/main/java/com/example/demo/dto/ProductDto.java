package com.example.demo.dto;

import com.example.demo.model.Category;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
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
    private Category category;
}

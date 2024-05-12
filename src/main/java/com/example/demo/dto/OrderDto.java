package com.example.demo.dto;

import com.example.demo.model.MasterOrder;
import com.example.demo.model.Product;
import lombok.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class OrderDto {
    private Long id;
    private Integer count;
    private String name;
    private Double price;
    private String imageUrl;
    private String category;
    private String productType;
    public OrderDto(Long id, Integer count, String name, Double price, String imageUrl, String category, String productType) {
        this.id = id;
        this.count = count;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.productType = productType;
    }
}

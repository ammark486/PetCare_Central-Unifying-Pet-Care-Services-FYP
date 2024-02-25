package com.example.demo.dto;

import com.example.demo.model.MasterOrder;
import com.example.demo.model.Product;
import lombok.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class OrderDto {
    private Long id;
    private MasterOrder masterOrder;
    private Product product;
    private Integer count;
}

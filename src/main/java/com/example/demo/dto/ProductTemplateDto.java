package com.example.demo.dto;

import lombok.*;

@Data
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ProductTemplateDto {
    private String name;
    private String quantity;
    private String price;
}

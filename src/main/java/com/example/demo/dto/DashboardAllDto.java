package com.example.demo.dto;

import lombok.*;

@Data
@Getter
@Setter
@ToString
@Builder
public class DashboardAllDto {
    private Long userCount;
    private Long totalSales;
}

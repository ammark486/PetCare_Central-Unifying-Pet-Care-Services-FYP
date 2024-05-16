package com.example.demo.dto;

import lombok.*;

import java.util.HashMap;
import java.util.Map;

@Data
@Getter
@Setter
@ToString
@Builder
public class DashboardYearDto {
    DashboardAllDto userAndSales;
    Map<Long, Long> monthlySales;
}

package com.example.demo.dto;

import com.example.demo.model.User;
import lombok.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MasterOrderDto {
    private Long id;
    private String userName;
    private String phoneNumber;
    private String address;
    private String city;
    private String zipCode;
    private String notes;
    private LocalDate orderDate;
    private Integer totalAmount;
    private User user;
    Map<Long, Integer> productIds = new HashMap<>();
}

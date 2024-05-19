package com.example.demo.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserDto {
    private Long id;
    private String userName;
    private String password;
    private String fullName;
    private String availableDays;
    private String bio;
    private boolean status;
}

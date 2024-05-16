package com.example.demo.dto;

import com.example.demo.model.Permission;
import com.example.demo.model.Role;
import lombok.*;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserDetailsDto {
    private Long id;
    private String userName;
    private String role;
    private List<String> permissions;
}

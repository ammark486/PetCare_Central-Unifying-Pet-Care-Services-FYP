package com.example.demo.dto;

import com.example.demo.model.Role;
import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserDetailsDto {
    private Long id;
    private String userName;
    private Set<Role> roleSet;

    public UserDetailsDto(Long id, String userName, Set<Role> roleSet) {
        this.id = id;
        this.userName = userName;
        this.roleSet = roleSet;
    }
}

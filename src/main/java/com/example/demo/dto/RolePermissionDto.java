package com.example.demo.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class RolePermissionDto {
    private Long roleId;
    private Long permissionId;
    private Boolean active;
}

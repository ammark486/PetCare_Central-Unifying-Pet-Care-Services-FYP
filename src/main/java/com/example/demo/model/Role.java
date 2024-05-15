package com.example.demo.model;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "role_permission",
//            joinColumns = @JoinColumn(name = "role_id") ,
//            inverseJoinColumns = @JoinColumn(name = "permission_id"))
//    private Set<Permission> permissions = new HashSet<>();
}

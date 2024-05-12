package com.example.demo.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
@TableGenerator(
        name = "master_order_generator",
        table = "id_generator",
        pkColumnName = "generator_name",
        valueColumnName = "next_value",
        pkColumnValue = "master_order_id",
        initialValue = 1000,
        allocationSize = 1
)
public class MasterOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "master_order_generator")
    private Long id;
    private String userName;
    private String phoneNumber;
    private String address;
    private String city;
    private String zipCode;
    private String notes;
    private LocalDate orderDate;
    private Integer totalAmount;
    private Boolean status;
    @ManyToOne
    private User user;
}

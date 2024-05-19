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
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private String email;
    private String phoneNumber;
    private String service;
    private String specie;
    private LocalDate date;
    private String additionalNotes;
    @ManyToOne
    private User vet;
    @ManyToOne
    private AvailableSlots availableSlots;
    private Boolean status;
}

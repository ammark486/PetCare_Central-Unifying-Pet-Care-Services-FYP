package com.example.demo.controller;

import com.example.demo.model.Appointment;
import com.example.demo.model.AvailableSlots;
import com.example.demo.service.AppointmentService;
import com.example.demo.util.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    @PostMapping("/appointment")
    ResponseEntity<Message<Appointment>> bookAppointment(@RequestBody Appointment appointment, Principal principal) throws MessagingException {
        return ResponseEntity.ok(this.appointmentService.bookAppointment(appointment, principal));
    }

    @GetMapping("/availableslots")
    ResponseEntity<Message<List<AvailableSlots>>> availableslots(@RequestParam String date){
        return ResponseEntity.ok(this.appointmentService.availableslots(date));
    }

    @GetMapping("/appointment")
    ResponseEntity<Message<List<Appointment>>> getAppointments(@RequestParam String type, Principal principal){
        return ResponseEntity.ok(this.appointmentService.getAppointments(type, principal));
    }

    @PutMapping("/appointment/{id}")
    ResponseEntity<Message<Appointment>> completeAppointment(@PathVariable Long id){
        return ResponseEntity.ok(this.appointmentService.completeAppointment(id));
    }
}

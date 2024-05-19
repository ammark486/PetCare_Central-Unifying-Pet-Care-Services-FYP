package com.example.demo.controller;

import com.example.demo.service.EmailService;
import com.example.demo.template.EmailTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/api")
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

//    @GetMapping("/email")
//    ResponseEntity<String> sendMail() throws MessagingException {
//        this.emailService.sendEmail("fa20bscs0040@maju.edu.pk", "ORDER CONFIRMATION", EmailTemplate.ORDER_TEMPLATE, true);
//        return ResponseEntity.ok().build();
//    }
}

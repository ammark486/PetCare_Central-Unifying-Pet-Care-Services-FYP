package com.example.demo.service;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import javax.activation.DataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@Service
@Getter
@Setter
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final FileService fileService;
    @Value("${project.image}")
    String path;
    String logoImageName = "logo.png";
    public EmailService(JavaMailSender javaMailSender, FileService fileService) {
        this.javaMailSender = javaMailSender;
        this.fileService = fileService;
    }

    public void sendEmail(String to, String subject, String text, boolean isHtml) throws MessagingException {
        MimeMessage mailMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mailMessage, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, isHtml);
            javaMailSender.send(mailMessage);
    }
}

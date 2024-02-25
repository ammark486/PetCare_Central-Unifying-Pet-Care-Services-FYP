package com.example.demo.controller;

import com.example.demo.service.FileService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api")
public class FileController {
    @Autowired
    FileService fileService;
    @Value("${project.image}")
    String path;

    @PostMapping("/file")
    ResponseEntity<String> uploadImage(@RequestParam MultipartFile file) throws IOException {
        String fileName = this.fileService.uploadFile(path, file);
        return ResponseEntity.ok(fileName);
    }

    @GetMapping("/file/{imageName}")
    public void downloadImage(@PathVariable String imageName, HttpServletResponse response) throws IOException {
        InputStream inputStream = this.fileService.getFile(path, imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(inputStream, response.getOutputStream());
    }
}

package com.example.demo.service;

import com.example.demo.dto.UploadResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Random;
import java.util.UUID;

@Service
public class FileService {

    @Value("${server.port}")
    private int serverPort;

    public UploadResponseDto uploadFile(String path, MultipartFile file) throws IOException {
        String name = file.getOriginalFilename();
        String randomId = UUID.randomUUID().toString();
        String completePath = randomId + name.substring(name.lastIndexOf("."));
        String filePath = Paths.get(path, completePath).toString();

        // Ensure the directory exists
        File directory = new File(path);
        if (!directory.exists()) {
            if (!directory.mkdirs()) {
                throw new IOException("Failed to create directory: " + path);
            }
        }

        // Save the file
        Files.copy(file.getInputStream(), Paths.get(filePath));

        // Build response DTO
        UploadResponseDto uploadResponseDto = UploadResponseDto.builder()
                .fileName("http://localhost:" + serverPort + "/api/file/" + completePath)
                .build();

        return uploadResponseDto;
    }

    public InputStream getFile(String path, String fileName) throws FileNotFoundException {
        String fullPath = path + "/"+ fileName;
        InputStream inputStream = new FileInputStream(fullPath);
        return inputStream;
    }
}

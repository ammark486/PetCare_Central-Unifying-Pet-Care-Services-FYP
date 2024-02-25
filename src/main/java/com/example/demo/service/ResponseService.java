package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.util.Message;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {

    public static <T> Message<T> responseData(String message, T data) {
        return (Message<T>) new Message<T>(message, data);
    }

}

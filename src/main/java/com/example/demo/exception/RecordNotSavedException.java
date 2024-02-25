package com.example.demo.exception;

import org.springframework.security.access.intercept.RunAsManager;

public class RecordNotSavedException extends RuntimeException {

    public  RecordNotSavedException(String message){
        super(message);
    }

}

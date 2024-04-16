package com.example.demo.exception;

public class UserUnauthorizeException extends RuntimeException{
    public  UserUnauthorizeException(String message){
        super(message);
    }
}

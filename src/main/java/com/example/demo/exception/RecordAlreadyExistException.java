package com.example.demo.exception;

public class RecordAlreadyExistException extends RuntimeException{

    public  RecordAlreadyExistException(String message){
        super(message);
    }

}

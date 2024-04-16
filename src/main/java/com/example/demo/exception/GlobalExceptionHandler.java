package com.example.demo.exception;

import com.example.demo.util.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecordNotFoundException.class)
    protected ResponseEntity<Message<Object>> recordNotFoundException(RecordNotFoundException ex){
        Message<Object> message = new Message<>().builder()
                .message(ex.getMessage())
                .status(HttpStatus.NOT_FOUND.value())
                .code(HttpStatus.NOT_FOUND.name()).build();
        return ResponseEntity.status(message.getStatus()).body(message);
    }

    @ExceptionHandler(RecordAlreadyExistException.class)
    protected ResponseEntity<Message<Object>> recordAlreadyExistException(RecordAlreadyExistException ex){
        Message<Object> message = new Message<>().builder()
                .message(ex.getMessage())
                .status(HttpStatus.BAD_REQUEST.value())
                .code(HttpStatus.BAD_REQUEST.name()).build();
        return ResponseEntity.status(message.getStatus()).body(message);
    }

    @ExceptionHandler(RecordNotSavedException.class)
    protected ResponseEntity<Message<Object>> recordNotSaveException(RecordNotSavedException ex){
        Message<Object> message = new Message<>().builder()
                .message(ex.getMessage())
                .status(HttpStatus.BAD_REQUEST.value())
                .code(HttpStatus.BAD_REQUEST.name()).build();
        return ResponseEntity.status(message.getStatus()).body(message);
    }

    @ExceptionHandler(RecordNotUpdateException.class)
    protected ResponseEntity<Message<Object>> recordNotUpdateException(RecordNotUpdateException ex){
        Message<Object> message = new Message<>().builder()
                .message(ex.getMessage())
                .status(HttpStatus.NOT_FOUND.value())
                .code(HttpStatus.NOT_FOUND.name()).build();
        return ResponseEntity.status(message.getStatus()).body(message);
    }

    @ExceptionHandler(UserUnauthorizeException.class)
    protected ResponseEntity<Message<Object>> unauthorizeUserException(UserUnauthorizeException ex){
        Message<Object> message = new Message<>().builder()
                .message(ex.getMessage())
                .status(HttpStatus.UNAUTHORIZED.value())
                .code(HttpStatus.UNAUTHORIZED.name()).build();
        return ResponseEntity.status(message.getStatus()).body(message);
    }

}

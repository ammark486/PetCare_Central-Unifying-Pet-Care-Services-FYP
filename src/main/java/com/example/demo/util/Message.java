package com.example.demo.util;

import com.example.demo.constants.StatusCode;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Builder
public class Message<T> {
    private int status;
    private String code;
    private String message;
    private T data;

    public Message(String message, T data){
        this.status = StatusCode.OK.value();
        this.code = StatusCode.OK.name();
        this.message = message;
        this.data = data;
    }
}

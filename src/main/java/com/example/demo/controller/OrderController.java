package com.example.demo.controller;

import com.example.demo.dto.MasterOrderDto;
import com.example.demo.model.MasterOrder;
import com.example.demo.service.MasterOrderService;
import com.example.demo.util.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api")
public class OrderController {
    private final MasterOrderService masterOrderService;

    public OrderController(MasterOrderService masterOrderService){
        this.masterOrderService = masterOrderService;
    }

    @PostMapping("/order")
    ResponseEntity<Message<MasterOrderDto>> saveOrder(@RequestBody MasterOrderDto masterOrderDto, Principal principal){
        return ResponseEntity.ok(this.masterOrderService.saveOrder(masterOrderDto, principal));
    }
}

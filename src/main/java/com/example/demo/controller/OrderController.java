package com.example.demo.controller;

import com.example.demo.dto.MasterOrderDto;
import com.example.demo.dto.OrderDto;
import com.example.demo.model.MasterOrder;
import com.example.demo.service.MasterOrderService;
import com.example.demo.service.OrderService;
import com.example.demo.util.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    private final MasterOrderService masterOrderService;
    private final OrderService orderService;

    public OrderController(MasterOrderService masterOrderService, OrderService orderService){
        this.masterOrderService = masterOrderService;
        this.orderService = orderService;
    }

    @PostMapping("/order")
    ResponseEntity<Message<MasterOrderDto>> saveOrder(@RequestBody MasterOrderDto masterOrderDto, Principal principal){
        return ResponseEntity.ok(this.masterOrderService.saveOrder(masterOrderDto, principal));
    }

    @RequestMapping("/master-order")
    ResponseEntity<Message<Page<MasterOrder>>> getMasterOrders(@RequestParam Integer page,
                                                               @RequestParam Integer size,
                                                               @RequestParam Boolean status){
        return ResponseEntity.ok(this.masterOrderService.getMasterOrders(status, PageRequest.of(page, size, Sort.by("id").descending())));
    }

    @RequestMapping("/order-products/{id}")
    ResponseEntity<Message<List<OrderDto>>> getOrderProductByMasterOrderId(@PathVariable Long id){
        return ResponseEntity.ok(this.orderService.getOrderProductByMasterOrderId(id));
    }

    @PutMapping("/order/{id}")
    ResponseEntity<Message<MasterOrder>> completeOrder(@PathVariable Long id){
        return ResponseEntity.ok(this.masterOrderService.completeOrder(id));
    }
}

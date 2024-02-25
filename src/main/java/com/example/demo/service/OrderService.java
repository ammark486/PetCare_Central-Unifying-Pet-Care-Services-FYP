package com.example.demo.service;

import com.example.demo.dto.MasterOrderDto;
import com.example.demo.model.OrderProduct;
import com.example.demo.repository.OrderProductRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderProductRepo orderProductRepo;

    public OrderService(OrderProductRepo orderProductRepo) {
        this.orderProductRepo = orderProductRepo;
    }

    public List<OrderProduct> saveOrderProducts(List<OrderProduct> orderProducts){
        return this.orderProductRepo.saveAll(orderProducts);
    }
}

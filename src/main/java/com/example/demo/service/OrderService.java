package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.dto.MasterOrderDto;
import com.example.demo.dto.OrderDto;
import com.example.demo.model.OrderProduct;
import com.example.demo.repository.OrderProductRepo;
import com.example.demo.util.Message;
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

    public Message<List<OrderDto>> getOrderProductByMasterOrderId(Long id) {
       Message<List<OrderDto>> message = new Message<>();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("fetch orders products successfully");
        message.setData(this.orderProductRepo.getOrderProductByMasterOrderId(id));
        return message;
    }
}

package com.example.demo.service;

import com.example.demo.dto.MasterOrderDto;
import com.example.demo.exception.RecordNotSavedException;
import com.example.demo.model.MasterOrder;
import com.example.demo.model.OrderProduct;
import com.example.demo.model.Product;
import com.example.demo.repository.MasterOrderRepo;
import com.example.demo.util.Message;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MasterOrderService {

    private final MasterOrderRepo masterOrderRepo;
    private final OrderService orderService;
    private final ProductService productService;
    private final UserService userService;
    @Autowired
    ModelMapper modelMapper;

    public MasterOrderService(MasterOrderRepo masterOrderRepo, OrderService orderService, ProductService productService, UserService userService) {
        this.masterOrderRepo = masterOrderRepo;
        this.orderService = orderService;
        this.productService = productService;
        this.userService = userService;
    }

    @Transactional
    public Message<MasterOrderDto> saveOrder(MasterOrderDto masterOrderDto, Principal principal){
       try {
           masterOrderDto.setUser(this.userService.findByUserName(principal.getName()));
           masterOrderDto.setOrderDate(LocalDate.now());
           List<OrderProduct> orderProducts = new ArrayList<>();
           List<Long> productIds = masterOrderDto.getProductIds().keySet().stream().collect(Collectors.toList());
           Integer totalAmount = 0;
           masterOrderDto.setTotalAmount(this.productService.sumOfProducts(productIds));
           MasterOrder masterOrder = this.modelMapper.map(masterOrderDto, MasterOrder.class);


           for (Map.Entry<Long, Integer> productId : masterOrderDto.getProductIds().entrySet()) {
               OrderProduct orderProduct = OrderProduct
                       .builder()
                       .product(Product.builder().id(productId.getKey()).build())
                       .masterOrder(masterOrder)
                       .count(productId.getValue())
                       .build();
               orderProducts.add(orderProduct);
           }

           masterOrder = this.masterOrderRepo.save(masterOrder);
           this.orderService.saveOrderProducts(orderProducts);
           return ResponseService.responseData("Order save successfully", this.modelMapper.map(masterOrder, MasterOrderDto.class));
       }catch(Exception e){
           throw new RecordNotSavedException("Order couldn't save");
       }
    }


}

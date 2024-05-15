package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.dto.MasterOrderDto;
import com.example.demo.dto.ProductDto;
import com.example.demo.exception.RecordNotFoundException;
import com.example.demo.exception.RecordNotSavedException;
import com.example.demo.model.MasterOrder;
import com.example.demo.model.OrderProduct;
import com.example.demo.model.Product;
import com.example.demo.model.ProductType;
import com.example.demo.repository.MasterOrderRepo;
import com.example.demo.util.Message;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.plaf.PanelUI;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.security.Principal;
import java.security.PublicKey;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MasterOrderService {

    private final MasterOrderRepo masterOrderRepo;
    private final OrderService orderService;
    private final ProductService productService;
    private final UserService userService;
    private final ProductTypeService productTypeService;
    @Autowired
    ModelMapper modelMapper;

    public MasterOrderService(MasterOrderRepo masterOrderRepo, OrderService orderService, ProductService productService, UserService userService, ProductTypeService productTypeService) {
        this.masterOrderRepo = masterOrderRepo;
        this.orderService = orderService;
        this.productService = productService;
        this.userService = userService;
        this.productTypeService = productTypeService;
    }

    @Transactional
    public Message<MasterOrderDto> saveOrder(MasterOrderDto masterOrderDto, Principal principal){
       try {
           masterOrderDto.setUser(this.userService.findByUserName(principal.getName()));
           masterOrderDto.setOrderDate(LocalDate.now());
           masterOrderDto.setStatus(false);
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
           this.activeProduct(orderProducts);
           return ResponseService.responseData("Order save successfully", this.modelMapper.map(masterOrder, MasterOrderDto.class));
       }catch(Exception e){
           throw new RecordNotSavedException("Order couldn't save");
       }
    }

    public void activeProduct(List<OrderProduct> orderProducts){
        for(OrderProduct orderProduct: orderProducts){
            ProductDto productDto = this.productService.findById(orderProduct.getProduct().getId());
            ProductType productType = this.productTypeService.findById(productDto.getProductTypeId());
            if(productType.getType().equalsIgnoreCase("animal")){
                productDto.setIsActive(false);
                this.productService.save(this.modelMapper.map(productDto, Product.class));
            }
        }
    }


    public Message<Page<MasterOrder>> getMasterOrders(Boolean status, Pageable pageable) {
        Message<Page<MasterOrder>> message = new Message<>();
        Page<MasterOrder> masterOrders = this.masterOrderRepo.findByStatus(status, pageable);
        if(masterOrders.getContent().size() > 0){
            masterOrders.getContent().forEach(masterOrder -> masterOrder.setUser(null));
            message.setCode(StatusCode.OK.name());
            message.setStatus(StatusCode.OK.value());
            message.setMessage("fetch orders successfully");
            message.setData(masterOrders);
            return message;
        }

        throw new RecordNotFoundException("Orders not found");
    }

    public Message<MasterOrder> completeOrder(Long id) {
        Message<MasterOrder> message = new Message<>();
        MasterOrder masterOrder = this.masterOrderRepo.findById(id).get();
        masterOrder.setStatus(true);
        MasterOrder updatedMasterOrder = this.masterOrderRepo.save(masterOrder);
        updatedMasterOrder.setUser(null);
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("order completed successfully");
        message.setData(updatedMasterOrder);
        return message;
    }

    public Long getTotalSales(){
        return this.masterOrderRepo.getTotalSales();
    }

    public Long getTotalSalesByYear(String year){
        return this.masterOrderRepo.getTotalSalesByYear(year);
    }

    public Map<Long, Long> getTotalAmountByMonthAndYear(String year) {
        Map<Long, Long> resultMap = new HashMap<>();
        for (int i = 1; i <= 12; i++) {
            resultMap.put((long) i, 0L);
        }

        // Retrieve the total amounts from the repository
        List<Object[]> resultList = this.masterOrderRepo.getTotalAmountByMonthAndYear(year);
        for (Object[] row : resultList) {
            BigDecimal totalAmount = (BigDecimal) row[0];
            BigInteger month = (BigInteger) row[1];
            long totalAmountLong = totalAmount.longValue();
            long monthLong = month.longValue();
            resultMap.put(monthLong, totalAmountLong);
        }

        return resultMap;
    }
}

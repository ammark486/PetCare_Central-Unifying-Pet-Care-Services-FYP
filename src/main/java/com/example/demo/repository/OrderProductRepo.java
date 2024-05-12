package com.example.demo.repository;

import com.example.demo.dto.OrderDto;
import com.example.demo.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderProductRepo extends JpaRepository<OrderProduct, Long> {
    @Query(value = "SELECT new com.example.demo.dto.OrderDto(od.id, od.count, p.name, p.price, p.imageUrl as imageUrl, c.name as category, pt.name as productType)" +
            " FROM OrderProduct od " +
            "INNER JOIN od.product p " +
            "INNER JOIN p.category c " +
            "INNER JOIN c.productType pt " +
            "where od.masterOrder.id = :id")
    List<OrderDto> getOrderProductByMasterOrderId(Long id);
}

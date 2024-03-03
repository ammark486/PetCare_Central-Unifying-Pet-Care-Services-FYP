package com.example.demo.controller;

import com.example.demo.model.ProductType;
import com.example.demo.service.ProductTypeService;
import com.example.demo.util.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductTypeController {

    private final ProductTypeService productTypeService;

    ProductTypeController(ProductTypeService productTypeService){
        this.productTypeService = productTypeService;
    }

    @PostMapping("/product-type")
    ResponseEntity<Message<ProductType>> save(@RequestBody ProductType productType){
        return ResponseEntity.ok(this.productTypeService.save(productType));
    }

    @GetMapping("/product-type")
    ResponseEntity<Message<List<ProductType>>> getAllProductTypes(@RequestParam String type, @RequestParam Boolean isActive){
        return ResponseEntity.ok(this.productTypeService.getAllProductTypes(type, isActive));
    }

}

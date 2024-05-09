package com.example.demo.controller;

import com.example.demo.dto.ProductDto;
import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepo;
import com.example.demo.service.ProductService;
import com.example.demo.util.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {
    public final ProductService productService;

    ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping("/product")
    public ResponseEntity<Message<ProductDto>> save(
            @RequestPart("productDto") Product productDto,
            @RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(this.productService.save(productDto, file));
    }

    @GetMapping("/product")
    ResponseEntity<Message<List<Product>>> getAllProduct(@RequestParam Boolean isActive){
        return ResponseEntity.ok(this.productService.getAllProduct(isActive));
    }

    @GetMapping("/product/{id}")
    ResponseEntity<Message<ProductDto>> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(this.productService.getProductById(id));
    }

    @PutMapping("/product")
    ResponseEntity<Message<Product>> updateProduct(@RequestBody Product product){
        return ResponseEntity.ok(this.productService.updateProduct(product));
    }

    @GetMapping("/product/categoryId")
    ResponseEntity<Message<Page<ProductDto>>> getProductByCategoryId(
            @RequestParam Long id, @RequestParam Boolean isActive,
            @RequestParam Integer page, @RequestParam Integer size){
        return ResponseEntity.ok(this.productService.getProductByCategoryId(id, isActive, PageRequest.of(page, size, Sort.by("id").descending())));
    }
}

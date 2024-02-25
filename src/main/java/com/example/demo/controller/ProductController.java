package com.example.demo.controller;

import com.example.demo.dto.ProductDto;
import com.example.demo.dto.Test;
import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepo;
import com.example.demo.service.ProductService;
import com.example.demo.util.Message;
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
            @RequestPart("productDto") ProductDto productDto,
            @RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(this.productService.save(productDto, file));
    }

    @GetMapping("/product")
    ResponseEntity<Message<List<Product>>> getAllProduct(@RequestParam Boolean isActive){
        return ResponseEntity.ok(this.productService.getAllProduct(isActive));
    }

    @GetMapping("/product/{id}")
    ResponseEntity<Message<Product>> getProductById(@PathVariable Long id, @RequestParam Boolean isActive){
        return ResponseEntity.ok(this.productService.getProductById(id, isActive));
    }

    @PutMapping("/product")
    ResponseEntity<Message<Product>> updateProduct(@RequestBody Product product){
        return ResponseEntity.ok(this.productService.updateProduct(product));
    }

    @GetMapping("/product/categoryId/{id}")
    ResponseEntity<Message<List<Product>>> getProductByCategoryId(@PathVariable Long id){
        return ResponseEntity.ok(this.productService.getProductByCategoryId(id));
    }

    @GetMapping("/test")
    ResponseEntity<Test> test(){
        Test test = new Test();
        test.setMessage("hello world");
        return ResponseEntity.ok(test);
    }
}

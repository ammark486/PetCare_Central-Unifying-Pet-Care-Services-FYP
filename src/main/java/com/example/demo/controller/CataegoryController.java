package com.example.demo.controller;

import com.example.demo.model.Category;
import com.example.demo.service.CategoryService;
import com.example.demo.util.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CataegoryController {
    
    public final CategoryService categoryService;
    
    CataegoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @PostMapping("/category")
    ResponseEntity<Message<Category>> save(@RequestBody Category category){
        return ResponseEntity.ok(this.categoryService.save(category));
    }

    @GetMapping("/category")
    ResponseEntity<Message<List<Category>>> getAllCategories(@RequestParam Boolean isActive){
        return ResponseEntity.ok(this.categoryService.getAllCategories(isActive));
    }

    @GetMapping("/category/{id}")
    ResponseEntity<Message<Category>> getCategoryById(@PathVariable Long id, @RequestParam Boolean isActive){
        return ResponseEntity.ok(this.categoryService.getCategoryById(id, isActive));
    }

    @PutMapping("/category/{id}")
    ResponseEntity<Message<Category>> updateCategory(@PathVariable Long id, @RequestBody Category category){
        return ResponseEntity.ok(this.categoryService.updateCategory(id, category));
    }

}

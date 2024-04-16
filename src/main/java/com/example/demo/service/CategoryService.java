package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.dto.CategoryDto;
import com.example.demo.exception.RecordNotFoundException;
import com.example.demo.exception.RecordNotSavedException;
import com.example.demo.model.Category;
import com.example.demo.repository.CategoryRepo;
import com.example.demo.util.Message;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    public final CategoryRepo categoryRepo;

    CategoryService(CategoryRepo categoryRepo){
        this.categoryRepo = categoryRepo;
    }
    public Message<Category> save(Category category) {

            if (!this.checkDuplicate(category.getName())) {
                category.setName(category.getName().trim());
                Category saveCategory = this.categoryRepo.save(category);
                Message<Category> message = new Message<>();
                message.setCode(StatusCode.OK.name());
                message.setStatus(StatusCode.OK.value());
                message.setData(saveCategory);
                message.setMessage("Category saved successfully");
                return message;
            } else {
                throw new RecordNotSavedException("Category must be unique");
            }
    }


    public Message<List<Category>> getAllCategories(Boolean isActive) {
        Optional<List<Category>> categories = Optional.of(this.categoryRepo.findAllByIsActive(isActive));
        if(categories.isPresent() && categories.get().size()!=0){
            Message message = new Message();
            message.setCode(StatusCode.OK.name());
            message.setStatus(StatusCode.OK.value());
            message.setData(categories.get());
            message.setMessage("fetch data successfully");
            return message;
        }else {
            throw new RecordNotFoundException("No categories found");
        }
    }

    public Message<Category> getCategoryById(Long id, Boolean isActive) {
        Optional<Category> category = this.categoryRepo.findByIsActiveAndId(isActive, id);
        if(category.isPresent() && category.get() !=null){
            Message<Category> message = new Message<>();
            message.setCode(StatusCode.OK.name());
            message.setStatus(StatusCode.OK.value());
            message.setData(category.get());
            message.setMessage("fetch data successfully");
            return message;
        }else {
            throw new RecordNotFoundException("data not found");
        }
    }

    public Message<Category> updateCategory(Long id, Category category) {
        Optional<Category> updateCategory = this.categoryRepo.findById(id);
        if(updateCategory.isPresent()){
            if(!this.checkDuplicate(category.getName()) || updateCategory.get().getName().equalsIgnoreCase(category.getName())){
                updateCategory.get().setName(category.getName());
                updateCategory.get().setIsActive(category.getIsActive());
                Message<Category> message = new Message();
                message.setCode(StatusCode.OK.name());
                message.setStatus(StatusCode.OK.value());
                message.setData(this.categoryRepo.save(updateCategory.get()));
                message.setMessage("update data successfully");
                return message;
            }else {
                throw new RecordNotSavedException("Category must be unique");
            }
        }else {
            throw new RecordNotSavedException("Record not saved, Category not found");
        }
    }

    private Boolean checkDuplicate(String categoryName){
       return Optional.ofNullable(this.categoryRepo.findByName(categoryName)).isPresent() ? true : false;
    }

    public Message<List<Category>> getCategoriesByProductTypeId(Long productTypeId) {
        List<Category> categories = this.categoryRepo.findCategoriesByProductTypeId(productTypeId);
        if(!categories.isEmpty()){
            Message<List<Category>> message = new Message();
            message.setCode(StatusCode.OK.name());
            message.setStatus(StatusCode.OK.value());
            message.setData(categories);
            message.setMessage("fetch data successfully");
            return message;
        }else{
            throw new RecordNotFoundException("data not found");
        }
    }
}

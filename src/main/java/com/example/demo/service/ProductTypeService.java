package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.exception.RecordNotFoundException;
import com.example.demo.model.ProductType;
import com.example.demo.repository.ProductRepo;
import com.example.demo.repository.ProductTypeRepo;
import com.example.demo.util.Message;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeService {

    private final ProductTypeRepo productTypeRepo;
    private final ResponseService responseService;

    ProductTypeService(ProductTypeRepo productTypeRepo, ResponseService responseService){
        this.productTypeRepo = productTypeRepo;
        this.responseService = responseService;
    }
    public Message<ProductType> save(ProductType productType) {
        return ResponseService.responseData( "save data successfully", this.productTypeRepo.save(productType));
    }

    public Message<List<ProductType>> getAllProductTypes(Boolean isActive) {
        List<ProductType> productTypeList = this.productTypeRepo.findAllByIsActive(isActive);
        if(!productTypeList.isEmpty()){
            return ResponseService.responseData("fetch data successfully", productTypeList);
        }
        throw new RecordNotFoundException("Product types not found");
    }
}

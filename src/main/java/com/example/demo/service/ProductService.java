package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.constants.Url;
import com.example.demo.dto.ProductDto;
import com.example.demo.dto.UserDto;
import com.example.demo.exception.RecordNotFoundException;
import com.example.demo.exception.RecordNotSavedException;
import com.example.demo.exception.RecordNotUpdateException;
import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepo;
import com.example.demo.util.Message;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Pageable;
import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Value("${project.image}")
    public String path;
    @Autowired
    ModelMapper modelMapper;
    public final ProductRepo productRepo;
    public final FileService fileService;

    ProductService(ProductRepo productRepo, FileService fileService){
        this.productRepo = productRepo;
        this.fileService = fileService;
    }
        public Message<ProductDto> save(ProductDto productDto, MultipartFile file) {
            try {
            String imagePath = this.fileService.uploadFile(path, file);
            productDto.setImageUrl(Url.IMAGE_URL + imagePath);
            Product saveProduct = this.productRepo.save(this.modelMapper.map(productDto, Product.class));
            Message<ProductDto> message = new Message<>();
            message.setCode(StatusCode.OK.name());
            message.setStatus(StatusCode.OK.value());
            message.setMessage("product save successfully");
            message.setData(this.modelMapper.map(saveProduct, ProductDto.class));
            return message;
        }catch(Exception e) {
            throw new RecordNotSavedException("product couldn't save");
        }
    }

    public Message<List<Product>> getAllProduct(Boolean isActive) {
        List<Product> products = this.productRepo.findAllByIsActive(isActive);
        if(!products.isEmpty()){
            Message<List<Product>> message = new Message<>();
            message.setCode(StatusCode.OK.name());
            message.setStatus(StatusCode.OK.value());
            message.setMessage("fetch all products successfully");
            message.setData(products);
            return message;
        }else {
            throw new RecordNotFoundException("Products not found");
        }
    }

    public Message<Product> getProductById(Long id, Boolean isActive) {
        Product product = this.productRepo.findByIsActiveAndId(isActive, id);
        if(product!=null){
            Message<Product> message = new Message<>();
            message.setCode(StatusCode.OK.name());
            message.setStatus(StatusCode.OK.value());
            message.setMessage("fetch product successfully");
            message.setData(product);
            return message;
        }else{
            throw new RecordNotFoundException("product not found");
        }
    }

    public Message<Product> updateProduct(Product product) {
        if(productRepo.findById(product.getId()).isPresent()){
            Message<Product> message = new Message<>();
            message.setCode(StatusCode.OK.name());
            message.setStatus(StatusCode.OK.value());
            message.setMessage("product update successfully");
            message.setData(this.productRepo.save(product));
            return message;
        }else {
            throw new RecordNotUpdateException("product couldn't update");
        }
    }

    public Message<Page<ProductDto>> getProductByCategoryId(Long id, Boolean isActive, Pageable pageable) {
        Page<ProductDto> products = this.productRepo.findByCategoryId(id, isActive, pageable);
        Message<Page<ProductDto>> message = new Message<>();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("product update successfully");
        message.setData(products);
        return message;
    }

    public Integer sumOfProducts(List<Long> productIds){
        return this.productRepo.sumOfProducts(productIds);
    }
}

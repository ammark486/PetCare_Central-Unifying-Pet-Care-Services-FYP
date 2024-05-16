package com.example.demo.controller;

import com.example.demo.dto.DashboardAllDto;
import com.example.demo.dto.DashboardYearDto;
import com.example.demo.service.DashBoardService;
import com.example.demo.util.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashBoardController {

    private final DashBoardService dashBoardService;

    public DashBoardController(DashBoardService dashBoardService) {
        this.dashBoardService = dashBoardService;
    }

    @GetMapping("/all-data")
    ResponseEntity<Message<DashboardAllDto>> getAllData(){
        return ResponseEntity.ok(this.dashBoardService.getAllData());
    }

    @GetMapping("/by-year")
    ResponseEntity<Message<DashboardYearDto>> getDataByYear(@RequestParam String year){
        return ResponseEntity.ok(this.dashBoardService.getDataByYear(year));
    }
}

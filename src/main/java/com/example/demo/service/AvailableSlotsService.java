package com.example.demo.service;

import com.example.demo.model.AvailableSlots;
import com.example.demo.repository.AvailableSlotsRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailableSlotsService {
    private final AvailableSlotsRepo availableSlotsRepo;

    public AvailableSlotsService(AvailableSlotsRepo availableSlotsRepo) {
        this.availableSlotsRepo = availableSlotsRepo;
    }

    public List<AvailableSlots> findAllAvailableSlots() {
        return this.availableSlotsRepo.findAll();
    }

    public List<AvailableSlots> findByIdNotIn(List<Long> slotsId) {
        return this.availableSlotsRepo.findByIdNotIn(slotsId);
    }

    public AvailableSlots findById(Long id) {
        return this.availableSlotsRepo.findById(id).get();
    }
}

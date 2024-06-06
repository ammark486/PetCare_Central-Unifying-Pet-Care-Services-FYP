package com.example.demo.controller;

import com.example.demo.model.Feedback;
import com.example.demo.service.FeedbackService;
import com.example.demo.util.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/feedback")
    ResponseEntity<Message<Feedback>> addFeedback(@RequestBody Feedback feedback, Principal principal){
        return ResponseEntity.ok(this.feedbackService.addFeedback(feedback, principal));
    }

    @GetMapping("/vet-feedback/{id}")
    ResponseEntity<Message<List<Feedback>>> getVetFeedbacks(@PathVariable Long id){
        return ResponseEntity.ok(this.feedbackService.getVetFeedbacks(id));
    }

    @GetMapping("/avg-rating/{id}")
    ResponseEntity<Message<Double>> getAvgRating(@PathVariable Long id){
        return ResponseEntity.ok(this.feedbackService.getAvgRating(id));
    }
}

package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.repository.FeedbackRepo;
import com.example.demo.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HelperService {
    @Autowired
    FeedbackRepo feedbackRepo;
    public Message<Double> getAvgRating(Long id) {
        Message<Double> message = new Message<>();
        message.setMessage("fetch data successsfully");
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setData(this.feedbackRepo.getAvgRating(id));
        return message;
    }
}

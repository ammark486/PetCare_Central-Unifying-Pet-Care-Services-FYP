package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.exception.RecordNotFoundException;
import com.example.demo.model.Feedback;
import com.example.demo.model.User;
import com.example.demo.repository.FeedbackRepo;
import com.example.demo.util.Message;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepo feedbackRepo;
    private final UserService userService;

    public FeedbackService(FeedbackRepo feedbackRepo, UserService userService) {
        this.feedbackRepo = feedbackRepo;
        this.userService = userService;
    }

    public Message<Feedback> addFeedback(Feedback feedback, Principal principal) {
        User user = this.userService.findByUserName(principal.getName());
        feedback.setFromUser(user);
        feedback.setLocalDate(LocalDate.now());
        this.feedbackRepo.save(feedback);
        Message<Feedback> message = new Message<>();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("feedback save successfully");
        message.setData(null);
        return message;
    }

    public Message<List<Feedback>> getVetFeedbacks(Long id) {
        List<Feedback> feedbacks = this.feedbackRepo.getVetFeedbacks(id);
        if(feedbacks.size() > 0){
            Message<List<Feedback>> message = new Message<>();
            message.setCode(StatusCode.OK.name());
            message.setStatus(StatusCode.OK.value());
            message.setMessage("fetch feedbacks successfully");
            message.setData(feedbacks);
            return message;
        }else{
            throw new RecordNotFoundException("Feedbacks not found");
        }
    }

    public Message<Double> getAvgRating(Long id) {
        Message<Double> message = new Message<>();
        message.setMessage("fetch data successsfully");
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setData(this.feedbackRepo.getAvgRating(id));
        return message;
    }
}

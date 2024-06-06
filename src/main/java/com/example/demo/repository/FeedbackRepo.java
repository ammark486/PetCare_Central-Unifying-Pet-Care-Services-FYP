package com.example.demo.repository;

import com.example.demo.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long> {
    @Query(value = "select f from Feedback f where f.vet.id = :id")
    List<Feedback> getVetFeedbacks(Long id);

    @Query(value = "SELECT AVG(f.ratingValue) FROM Feedback f\n" +
            "where f.vet.id = :vetId")
    Double getAvgRating(Long vetId);
}

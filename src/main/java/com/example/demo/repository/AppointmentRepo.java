package com.example.demo.repository;

import com.example.demo.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDate(LocalDate date);

    @Query("SELECT a FROM Appointment a WHERE a.date > :currentDate AND a.status = false")
    List<Appointment> findUpcomingAppointments(LocalDate currentDate);

    List<Appointment> findByStatus(boolean b);

    List<Appointment> findByDateAndStatus(LocalDate date, Boolean status);
}

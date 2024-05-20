package com.example.demo.repository;

import com.example.demo.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDate(LocalDate date);

    @Query("SELECT a FROM Appointment a WHERE a.date > :currentDate AND a.status = false AND a.vet.id = :vetId")
    List<Appointment> findUpcomingAppointments(@Param("currentDate") LocalDate currentDate, @Param("vetId") Long vetId);
    @Query("SELECT a FROM Appointment a where a.status = :status and a.vet.id = :id")
    List<Appointment> findByStatusAndId(@Param("status") Boolean b, @Param("id") Long id);
    @Query("SELECT a FROM Appointment a WHERE a.date = :date AND a.status = :status AND a.vet.id = :id")
    List<Appointment> findByDateAndStatusAndId(@Param("date") LocalDate date, @Param("status") Boolean status, @Param("id") Long id);
}

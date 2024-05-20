package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.exception.RecordNotFoundException;
import com.example.demo.model.Appointment;
import com.example.demo.model.AvailableSlots;
import com.example.demo.model.User;
import com.example.demo.repository.AppointmentRepo;
import com.example.demo.template.EmailTemplate;
import com.example.demo.util.Message;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.security.Principal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    private final AppointmentRepo appointmentRepo;
    private final AvailableSlotsService availableSlotsService;
    private final EmailService emailService;
    private final UserService userService;
    private String APPOINTMENT_TYPE_UPCOMING = "UPCOMING";
    private String APPOINTMENT_TYPE_HISTORY = "HISTORY";
    private String APPOINTMENT_TYPE_TODAY = "TODAY";

    public AppointmentService(AppointmentRepo appointmentRepo, AvailableSlotsService availableSlotsService, EmailService emailService, UserService userService) {
        this.appointmentRepo = appointmentRepo;
        this.availableSlotsService = availableSlotsService;
        this.emailService = emailService;
        this.userService = userService;
    }

    public Message<List<AvailableSlots>> availableslots(String date) {
        List<Appointment> appointments = this.appointmentRepo.findByDate(this.convertInToLocalDate(date));
        List<Long> slotsId = appointments.stream().map(appointment -> appointment.getAvailableSlots().getId()).collect(Collectors.toList());
        List<AvailableSlots> availableSlots;
        if(appointments.size() > 0){
            availableSlots = this.availableSlotsService.findByIdNotIn(slotsId);
        }else{
            availableSlots = this.availableSlotsService.findAllAvailableSlots();
        }
        Message<List<AvailableSlots>> message = new Message<>();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("fetch available slots successfully");
        message.setData(availableSlots);
        return message;
    }

    private LocalDate convertInToLocalDate(String date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        return localDate;
    }

    public Message<Appointment> bookAppointment(Appointment appointment, Principal principal) throws MessagingException {
        User user = this.userService.findById(appointment.getVet().getId());
        AvailableSlots availableSlots = this.availableSlotsService.findById(appointment.getAvailableSlots().getId());
        String appointmentMessage = "<P>Thank you for booking the appointment. Your appointment has been confirmed with " +user.getFullName()+". It is scheduled for "+appointment.getDate()+" at "+availableSlots.getName()+". The payable amount is "+appointmentAmmount(appointment.getService())+".</P>";
        appointment.setStatus(false);
        appointment.setEmail(principal.getName());
        appointment.setVet(user);
        Message<Appointment> message = new Message<>();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("Save appointment successfully");
        message.setData(this.appointmentRepo.save(appointment));
        this.emailService.sendEmail(principal.getName(), "APPOINTMENT CONFIRMATION", EmailTemplate.getAppointmentTemplate(appointmentMessage), true);
        return message;
    }

    public Message<List<Appointment>> getAppointments(String type, Principal principal) {
        User user = this.userService.findByUserName(principal.getName());
        List<Appointment> appointments;
        if(type.equalsIgnoreCase(this.APPOINTMENT_TYPE_UPCOMING)){
            appointments = this.appointmentRepo.findUpcomingAppointments(LocalDate.now(), user.getId());
        }else if(type.equalsIgnoreCase(this.APPOINTMENT_TYPE_HISTORY)){
            appointments = this.appointmentRepo.findByStatusAndId(true, user.getId());
        }else {
            appointments = this.appointmentRepo.findByDateAndStatusAndId(LocalDate.now(), false, user.getId());
        }

        if(appointments.size() > 0){
            Message<List<Appointment>> message = new Message<>();
            message.setCode(StatusCode.OK.name());
            message.setStatus(StatusCode.OK.value());
            message.setMessage("Fetch appointment successfully");
            message.setData(appointments);
            return message;
        }
        throw new RecordNotFoundException("Appointments not found");
    }

    public Message<Appointment> completeAppointment(Long id) {
        Appointment appointment = this.appointmentRepo.findById(id).get();
        appointment.setStatus(true);
        Message<Appointment> message = new Message<>();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("Complete appointment successfully");
        message.setData(this.appointmentRepo.save(appointment));
        return message;
    }

    private String appointmentAmmount(String service){
        if(service.equalsIgnoreCase("surgeries")){
            return "5000";
        }else if(service.equalsIgnoreCase("vaccination")){
            return "500";
        }else if(service.equalsIgnoreCase("petgrooming")){
            return "1000";
        }else if(service.equalsIgnoreCase("generaltreatment")){
            return "1000";
        }else if(service.equalsIgnoreCase("generalcheckup")){
            return "500";
        }else if(service.equalsIgnoreCase("dentalcare")){
            return "2000";
        }else if(service.equalsIgnoreCase("diagnostictest")){
            return "500 - 5000";
        }else {
            return "";
        }
    }
}

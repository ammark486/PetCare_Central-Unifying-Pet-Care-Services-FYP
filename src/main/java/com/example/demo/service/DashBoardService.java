package com.example.demo.service;

import com.example.demo.constants.StatusCode;
import com.example.demo.dto.DashboardAllDto;
import com.example.demo.dto.DashboardYearDto;
import com.example.demo.util.Message;
import org.springframework.stereotype.Service;

@Service
public class DashBoardService {

    private final UserService userService;
    private final MasterOrderService masterOrderService;
    private final AppointmentService appointmentService;

    public DashBoardService(UserService userService, MasterOrderService masterOrderService, AppointmentService appointmentService) {
        this.userService = userService;
        this.masterOrderService = masterOrderService;
        this.appointmentService = appointmentService;
    }

    public Message<DashboardAllDto> getAllData() {
        Message<DashboardAllDto> message = new Message<>();
        DashboardAllDto dashBoardAllDto = DashboardAllDto.builder().
                userCount(this.userService.countAllUsers())
                .totalSales(this.masterOrderService.getTotalSales())
                .completedAppointment(this.appointmentService.getCompletedAppointmenCount())
                .totalVets(this.userService.getAllVets())
                .build();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("fetch all dashboard data successfully");
        message.setData(dashBoardAllDto);
        return message;
    }

    public Message<DashboardYearDto> getDataByYear(String year){
        Message<DashboardYearDto> message = new Message<>();
        DashboardAllDto dashBoardAllDto = DashboardAllDto.builder().
                userCount(this.userService.countAllUsersByYear(year))
                .totalSales(this.masterOrderService.getTotalSalesByYear(year))
                .completedAppointment(this.appointmentService.getCompletedAppointmenYearlyCount(year))
                .totalVets(this.userService.getAllVetsYearly(year))
                .build();

        DashboardYearDto dashboardYearDto = DashboardYearDto.builder()
                .userAndSales(dashBoardAllDto)
                .monthlySales(this.masterOrderService.getTotalAmountByMonthAndYear(year))
                .build();
        message.setCode(StatusCode.OK.name());
        message.setStatus(StatusCode.OK.value());
        message.setMessage("fetch yearly dashboard data successfully");
        message.setData(dashboardYearDto);
        return message;
    }
}

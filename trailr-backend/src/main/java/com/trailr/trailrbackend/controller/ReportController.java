package com.trailr.trailrbackend.controller;

import com.trailr.trailrbackend.dto.MenuReportDTO;
import com.trailr.trailrbackend.service.MenuReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

/*
 Controller responsible for report endpoints.
*/
@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:4200")
public class ReportController {

    private final MenuReportService menuReportService;

    public ReportController(MenuReportService menuReportService) {
        this.menuReportService = menuReportService;
    }

    @GetMapping("/menu")
    public MenuReportDTO generateMenuReport() {
        return menuReportService.generateMenuReport();
    }
}
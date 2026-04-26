package com.trailr.trailrbackend.service;

import com.trailr.trailrbackend.dto.MenuReportDTO;
import com.trailr.trailrbackend.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/*
 Service responsible for generating menu reports.
*/
@Service
public class MenuReportService {

    private final MenuItemRepository menuItemRepository;

    public MenuReportService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public MenuReportDTO generateMenuReport() {

        MenuReportDTO report = new MenuReportDTO();

        report.setTitle("Trailr Menu Report");

        report.setGeneratedAt(LocalDateTime.now());

        report.setMenuItems(menuItemRepository.findAll());

        return report;
    }
}
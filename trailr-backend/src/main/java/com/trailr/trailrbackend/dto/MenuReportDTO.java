package com.trailr.trailrbackend.dto;

import com.trailr.trailrbackend.model.MenuItem;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

/*
 DTO used to generate structured menu reports.
 Includes report title, timestamp, and menu item data.
*/
@Getter
@Setter
public class MenuReportDTO {

    private String title;

    private LocalDateTime generatedAt;

    private List<MenuItem> menuItems;
}
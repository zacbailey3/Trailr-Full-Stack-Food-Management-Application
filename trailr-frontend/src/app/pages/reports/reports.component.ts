import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportService, MenuReport } from '../../services/reports.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  report: MenuReport | null = null;
  errorMessage = '';

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  /*
   Loads menu report data from backend report endpoint.
  */
  loadReport(): void {

    this.reportService.getMenuReport().subscribe({

      next: (data) => {
        console.log('Report loaded:', data);
        this.report = data;
      },

      error: (error) => {
        console.error('Error loading report:', error);
        this.errorMessage = 'Unable to load report data.';
      }

    });

  }

}

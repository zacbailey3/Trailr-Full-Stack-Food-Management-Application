import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MenuItemService, MenuItem } from '../../services/menu-item.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor(private menuItemService: MenuItemService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /*
   Loads menu item data used for dashboard summary cards.
  */
  loadDashboardData(): void {
    this.menuItemService.getMenuItems().subscribe({
      next: (data) => {
        this.menuItems = data;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  get totalItems(): number {
    return this.menuItems.length;
  }

  get availableItems(): number {
    return this.menuItems.filter(item => item.available).length;
  }

  get unavailableItems(): number {
    return this.menuItems.filter(item => !item.available).length;
  }
}

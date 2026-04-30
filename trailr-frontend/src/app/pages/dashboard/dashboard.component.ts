import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MenuItemService, MenuItem } from '../../services/menu-item.service';

import {
  InventoryItem,
  InventoryItemService
} from '../../services/inventory-item.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  menuItems: MenuItem[] = [];
  inventoryItems: InventoryItem[] = [];


  constructor(
    private menuItemService: MenuItemService,
    private inventoryItemService: InventoryItemService
  ) {}

  ngOnInit(): void {

    this.loadDashboardData();
    this.loadInventoryData();

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

  /*
 Loads inventory data for dashboard analytics.
*/
  loadInventoryData(): void {

    this.inventoryItemService.getInventoryItems().subscribe({

      next: (data) => {
        this.inventoryItems = data;
      },

      error: (error) => {
        console.error('Error loading inventory data:', error);
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

  get totalInventoryItems(): number {
    return this.inventoryItems.length;
  }

  get lowStockItems(): number {

    return this.inventoryItems.filter(

      item => item.quantity <= item.reorderLevel

    ).length;

  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuItemService, MenuItem } from '../../services/menu-item.service';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  menuItems: MenuItem[] = [];

  newMenuItem: MenuItem = {
    itemName: '',
    price: 0,
    category: '',
    available: true
  };

  errorMessage = '';
  searchTerm = '';
  editingItemId: number | null = null;

  constructor(private menuItemService: MenuItemService) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  /*
   Loads menu items from the backend API.
   This supports real-time database-driven UI updates.
  */
  loadMenuItems(): void {
    this.menuItemService.getMenuItems().subscribe({
      next: (data) => {
        this.menuItems = data;
      },
      error: (error) => {
        console.error('Error loading menu items:', error);
      }
    });
  }

  /*
Searches menu items using partial text matches.
This supports searchable multi-row results.
 */
  searchMenuItems(): void {

    if (!this.searchTerm.trim()) {
      this.loadMenuItems();
      return;
    }

    this.menuItemService.searchMenuItems(this.searchTerm).subscribe({
      next: (data) => {
        this.menuItems = data;
      },
      error: (error) => {
        console.error('Error searching menu items:', error);
      }
    });
  }

  /*
 Loads an existing menu item into the form for editing.
 */
  editMenuItem(item: MenuItem): void {

    this.editingItemId = item.id ?? null;

    this.newMenuItem = {
      itemName: item.itemName,
      price: item.price,
      category: item.category,
      available: item.available
    };
  }

  /*
  Validates form data before creating or updating menu items.
 */
  addMenuItem(): void {

    this.errorMessage = '';

    if (!this.newMenuItem.itemName.trim()) {
      this.errorMessage = 'Item name is required.';
      return;
    }

    if (!this.newMenuItem.category.trim()) {
      this.errorMessage = 'Category is required.';
      return;
    }

    if (this.newMenuItem.price < 0) {
      this.errorMessage = 'Price cannot be negative.';
      return;
    }

    // Update existing item
    if (this.editingItemId !== null) {

      this.menuItemService
        .updateMenuItem(this.editingItemId, this.newMenuItem)
        .subscribe({

          next: () => {
            this.resetForm();
            this.loadMenuItems();
          },

          error: (error) => {
            console.error('Error updating menu item:', error);
            this.errorMessage = 'Unable to update menu item.';
          }
        });
    }

    // Create new item
    else {

      this.menuItemService.createMenuItem(this.newMenuItem).subscribe({

        next: () => {
          this.resetForm();
          this.loadMenuItems();
        },

        error: (error) => {
          console.error('Error creating menu item:', error);
          this.errorMessage = 'Unable to create menu item.';
        }
      });
    }
  }

  /*
 Resets the form after create or update operations.
  */
  resetForm(): void {

    this.newMenuItem = {
      itemName: '',
      price: 0,
      category: '',
      available: true
    };

    this.editingItemId = null;
  }

  /*
  Deletes a menu item after confirming the user's action.
  This supports database delete functionality from the GUI.
  */
  deleteMenuItem(id: number | undefined): void {
    if (!id) {
      return;
    }

    const confirmed = confirm('Are you sure you want to delete this menu item?');

    if (confirmed) {
      this.menuItemService.deleteMenuItem(id).subscribe({
        next: () => {
          this.loadMenuItems();
        },
        error: (error) => {
          console.error('Error deleting menu item:', error);
          this.errorMessage = 'Unable to delete menu item.';
        }
      });
    }
  }
}


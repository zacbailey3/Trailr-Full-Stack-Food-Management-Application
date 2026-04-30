import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  InventoryItem,
  InventoryItemService
} from '../../services/inventory-item.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventoryItems: InventoryItem[] = [];

  searchTerm = '';
  errorMessage = '';

  editingItemId: number | null = null;

  newInventoryItem: InventoryItem = {
    itemName: '',
    quantity: 0,
    unit: '',
    reorderLevel: 0
  };

  constructor(private inventoryItemService: InventoryItemService) {}

  ngOnInit(): void {
    this.loadInventoryItems();
  }

  /*
   Loads inventory items from backend API.
  */
  loadInventoryItems(): void {

    this.inventoryItemService.getInventoryItems().subscribe({

      next: (data) => {
        this.inventoryItems = data;
      },

      error: (error) => {
        console.error('Error loading inventory items:', error);
      }

    });

  }

  /*
   Searches inventory items using partial text matching.
  */
  searchInventoryItems(): void {

    if (!this.searchTerm.trim()) {
      this.loadInventoryItems();
      return;
    }

    this.inventoryItemService.searchInventoryItems(this.searchTerm)
      .subscribe({

        next: (data) => {
          this.inventoryItems = data;
        },

        error: (error) => {
          console.error('Error searching inventory:', error);
        }

      });

  }

  /*
   Handles inventory create and update operations.
  */
  saveInventoryItem(): void {

    this.errorMessage = '';

    if (!this.newInventoryItem.itemName.trim()) {
      this.errorMessage = 'Item name is required.';
      return;
    }

    if (!this.newInventoryItem.unit.trim()) {
      this.errorMessage = 'Unit is required.';
      return;
    }

    if (this.editingItemId !== null) {

      this.inventoryItemService
        .updateInventoryItem(
          this.editingItemId,
          this.newInventoryItem
        )
        .subscribe({

          next: () => {
            this.resetForm();
            this.loadInventoryItems();
          },

          error: (error) => {
            console.error('Error updating inventory item:', error);
          }

        });

    }

    else {

      this.inventoryItemService
        .createInventoryItem(this.newInventoryItem)
        .subscribe({

          next: () => {
            this.resetForm();
            this.loadInventoryItems();
          },

          error: (error) => {
            console.error('Error creating inventory item:', error);
          }

        });

    }

  }

  /*
   Loads selected inventory item into form for editing.
  */
  editInventoryItem(item: InventoryItem): void {

    this.editingItemId = item.id ?? null;

    this.newInventoryItem = {
      itemName: item.itemName,
      quantity: item.quantity,
      unit: item.unit,
      reorderLevel: item.reorderLevel
    };

  }

  /*
   Deletes inventory item after confirmation.
  */
  deleteInventoryItem(id: number | undefined): void {

    if (!id) {
      return;
    }

    const confirmed = confirm(
      'Are you sure you want to delete this inventory item?'
    );

    if (confirmed) {

      this.inventoryItemService
        .deleteInventoryItem(id)
        .subscribe({

          next: () => {
            this.loadInventoryItems();
          },

          error: (error) => {
            console.error('Error deleting inventory item:', error);
          }

        });

    }

  }

  /*
   Resets inventory form after create/update.
  */
  resetForm(): void {

    this.newInventoryItem = {
      itemName: '',
      quantity: 0,
      unit: '',
      reorderLevel: 0
    };

    this.editingItemId = null;

  }

}

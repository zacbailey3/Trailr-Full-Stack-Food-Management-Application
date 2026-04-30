package com.trailr.trailrbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/*
 Inventory items represent supplies or ingredients used by the food truck.
 This supports tracking stock levels and identifying low inventory.
*/
@Entity
@Table(name = "inventory_items")
@Getter
@Setter
public class InventoryItem extends BaseEntity {

    @NotBlank(message = "Inventory item name is required")
    private String itemName;

    @Min(value = 0, message = "Quantity cannot be negative")
    private int quantity;

    /*
     Unit describes how the item is measured.
     Examples: pounds, ounces, bottles, cases, units.
    */
    @NotBlank(message = "Unit is required")
    private String unit;

    /*
     Reorder level helps identify when inventory is running low.
    */
    @Min(value = 0, message = "Reorder level cannot be negative")
    private int reorderLevel;

    /*
     Returns true when the current quantity is at or below the reorder level.
     This is useful for future low inventory reports.
    */
    public boolean isLowStock() {
        return quantity <= reorderLevel;
    }
}
package com.trailr.trailrbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/*
 Menu items represent food or drink products
 available for customer orders.
*/
@Entity
@Table(name = "menu_items")
@Getter
@Setter
public class MenuItem extends BaseEntity {

    /*
     Item name is required to prevent empty menu entries.
    */
    @NotBlank(message = "Item name is required")
    private String itemName;

    /*
     Price must be greater than or equal to zero.
     Validation helps prevent invalid pricing data.
    */
    @Min(value = 0, message = "Price must be positive")
    private double price;

    /*
     Category allows scalable menu organization.
     Example categories: Drinks, Meals, Desserts.
    */
    private String category;

    /*
     Indicates whether item is currently available.
    */
    private boolean available;
}
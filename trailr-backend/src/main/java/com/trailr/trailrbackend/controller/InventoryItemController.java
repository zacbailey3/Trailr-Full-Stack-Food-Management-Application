package com.trailr.trailrbackend.controller;

import com.trailr.trailrbackend.model.InventoryItem;
import com.trailr.trailrbackend.service.InventoryItemService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 Controller exposes REST endpoints for inventory management.
 Supports CRUD operations and inventory search functionality.
*/
@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = {
        "http://localhost:4200",
        "https://trailr-app.up.railway.app"
})
public class InventoryItemController {

    private final InventoryItemService inventoryItemService;

    public InventoryItemController(InventoryItemService inventoryItemService) {
        this.inventoryItemService = inventoryItemService;
    }

    @GetMapping
    public List<InventoryItem> getAllInventoryItems() {
        return inventoryItemService.getAllInventoryItems();
    }

    @GetMapping("/{id}")
    public InventoryItem getInventoryItemById(@PathVariable Long id) {
        return inventoryItemService.getInventoryItemById(id);
    }

    @PostMapping
    public InventoryItem createInventoryItem(
            @Valid @RequestBody InventoryItem inventoryItem) {

        return inventoryItemService.createInventoryItem(inventoryItem);
    }

    @PutMapping("/{id}")
    public InventoryItem updateInventoryItem(
            @PathVariable Long id,
            @Valid @RequestBody InventoryItem inventoryItem) {

        return inventoryItemService.updateInventoryItem(id, inventoryItem);
    }

    @DeleteMapping("/{id}")
    public void deleteInventoryItem(@PathVariable Long id) {
        inventoryItemService.deleteInventoryItem(id);
    }

    /*
     Search endpoint supports multi-row inventory search results.
    */
    @GetMapping("/search")
    public List<InventoryItem> searchInventoryItems(
            @RequestParam String itemName) {

        return inventoryItemService.searchInventoryItems(itemName);
    }
}
package com.trailr.trailrbackend.service;

import com.trailr.trailrbackend.model.InventoryItem;
import com.trailr.trailrbackend.repository.InventoryItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/*
 Service layer handles inventory business logic separately from controllers.
*/
@Service
public class InventoryItemService {

    private final InventoryItemRepository inventoryItemRepository;

    public InventoryItemService(InventoryItemRepository inventoryItemRepository) {
        this.inventoryItemRepository = inventoryItemRepository;
    }

    public List<InventoryItem> getAllInventoryItems() {
        return inventoryItemRepository.findAll();
    }

    public InventoryItem getInventoryItemById(Long id) {
        return inventoryItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with id: " + id));
    }

    public InventoryItem createInventoryItem(InventoryItem inventoryItem) {
        return inventoryItemRepository.save(inventoryItem);
    }

    public InventoryItem updateInventoryItem(Long id, InventoryItem updatedInventoryItem) {
        InventoryItem existingItem = getInventoryItemById(id);

        existingItem.setItemName(updatedInventoryItem.getItemName());
        existingItem.setQuantity(updatedInventoryItem.getQuantity());
        existingItem.setUnit(updatedInventoryItem.getUnit());
        existingItem.setReorderLevel(updatedInventoryItem.getReorderLevel());

        return inventoryItemRepository.save(existingItem);
    }

    public void deleteInventoryItem(Long id) {
        InventoryItem existingItem = getInventoryItemById(id);
        inventoryItemRepository.delete(existingItem);
    }

    public List<InventoryItem> searchInventoryItems(String itemName) {
        return inventoryItemRepository.findByItemNameContainingIgnoreCase(itemName);
    }
}
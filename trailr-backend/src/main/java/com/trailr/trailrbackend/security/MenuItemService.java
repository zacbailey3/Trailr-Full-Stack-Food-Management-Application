package com.trailr.trailrbackend.service;

import com.trailr.trailrbackend.model.MenuItem;
import com.trailr.trailrbackend.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/*
 Service layer keeps business logic separate from controller code.
 This improves scalability and makes the application easier to maintain.
*/
@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    public MenuItemService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public MenuItem getMenuItemById(Long id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
    }

    public MenuItem createMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public MenuItem updateMenuItem(Long id, MenuItem updatedMenuItem) {
        MenuItem existingItem = getMenuItemById(id);

        // Updates only editable fields while preserving the original database ID.
        existingItem.setItemName(updatedMenuItem.getItemName());
        existingItem.setPrice(updatedMenuItem.getPrice());
        existingItem.setCategory(updatedMenuItem.getCategory());
        existingItem.setAvailable(updatedMenuItem.isAvailable());

        return menuItemRepository.save(existingItem);
    }

    public void deleteMenuItem(Long id) {
        MenuItem existingItem = getMenuItemById(id);
        menuItemRepository.delete(existingItem);
    }

    public List<MenuItem> searchMenuItems(String itemName) {
        return menuItemRepository.findByItemNameContainingIgnoreCase(itemName);
    }
}
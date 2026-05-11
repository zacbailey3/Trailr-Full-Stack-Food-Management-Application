package com.trailr.trailrbackend.controller;

import com.trailr.trailrbackend.model.MenuItem;
import com.trailr.trailrbackend.service.MenuItemService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

/*
 Controller exposes REST endpoints for menu item management.
 These endpoints support CRUD operations required for the application.
*/
@RestController
@RequestMapping("/api/menu-items")
@CrossOrigin(origins = {
        "http://localhost:4200",
        "https://trailr-app.up.railway.app"
})
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return menuItemService.getAllMenuItems();
    }

    @GetMapping("/{id}")
    public MenuItem getMenuItemById(@PathVariable Long id) {
        return menuItemService.getMenuItemById(id);
    }

    @PostMapping
    public MenuItem createMenuItem(@Valid @RequestBody MenuItem menuItem) {
        return menuItemService.createMenuItem(menuItem);
    }

    @PutMapping("/{id}")
    public MenuItem updateMenuItem(@PathVariable Long id, @Valid @RequestBody MenuItem menuItem) {
        return menuItemService.updateMenuItem(id, menuItem);
    }

    @DeleteMapping("/{id}")
    public void deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
    }

    /*
     Search endpoint returns multiple matching rows when users search by item name.
    */
    @GetMapping("/search")
    public List<MenuItem> searchMenuItems(@RequestParam String itemName) {
        return menuItemService.searchMenuItems(itemName);
    }
}
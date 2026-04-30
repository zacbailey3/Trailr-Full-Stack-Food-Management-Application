package com.trailr.trailrbackend.repository;

import com.trailr.trailrbackend.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/*
 Repository handles database operations for inventory items.
*/
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {

    /*
     Search functionality allows users to find inventory items
     by partial item name matches.
    */
    List<InventoryItem> findByItemNameContainingIgnoreCase(String itemName);
}
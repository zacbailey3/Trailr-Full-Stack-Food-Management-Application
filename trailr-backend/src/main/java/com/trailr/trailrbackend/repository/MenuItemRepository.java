package com.trailr.trailrbackend.repository;

import com.trailr.trailrbackend.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/*
 Repository handles database operations for menu items.
*/
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    /*
     Search functionality allows users to search menu items
     by partial name matches.
    */
    List<MenuItem> findByItemNameContainingIgnoreCase(String itemName);
}
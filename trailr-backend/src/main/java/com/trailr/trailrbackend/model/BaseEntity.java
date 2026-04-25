package com.trailr.trailrbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/*
 Shared base entity used to provide common fields
 across database tables for scalability and consistency.
*/
@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     Tracks when records are created.
     Useful for reporting and auditing purposes.
    */
    private LocalDateTime createdAt = LocalDateTime.now();
}
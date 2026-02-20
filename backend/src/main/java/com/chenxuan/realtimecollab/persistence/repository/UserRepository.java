package com.chenxuan.realtimecollab.persistence.repository;

import com.chenxuan.realtimecollab.persistence.entity.User;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for {@link User}. Used by auth module for lookup by email and by id.
 */
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}

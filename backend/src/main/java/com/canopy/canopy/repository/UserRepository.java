package com.canopy.canopy.repository;

import com.canopy.canopy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

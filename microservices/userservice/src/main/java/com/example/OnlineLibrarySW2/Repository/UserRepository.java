package com.example.OnlineLibrarySW2.Repository;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.OnlineLibrarySW2.Entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // You can add custom query methods here if needed
    Optional<User> findByEmail(String email);

    Optional<User> findByUserName(String username);

    @NotNull
    Optional<User> findById(@NotNull Long id);
}

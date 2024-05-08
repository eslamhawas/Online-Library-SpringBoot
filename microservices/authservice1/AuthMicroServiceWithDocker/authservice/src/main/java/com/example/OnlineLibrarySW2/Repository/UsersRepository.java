package com.example.OnlineLibrarySW2.Repository;

import com.example.OnlineLibrarySW2.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUserName(String username);


}

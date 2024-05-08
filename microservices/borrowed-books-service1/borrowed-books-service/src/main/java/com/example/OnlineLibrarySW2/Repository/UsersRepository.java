package com.example.OnlineLibrarySW2.Repository;

import com.example.OnlineLibrarySW2.BorrowedBooks;
import com.example.OnlineLibrarySW2.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);
}
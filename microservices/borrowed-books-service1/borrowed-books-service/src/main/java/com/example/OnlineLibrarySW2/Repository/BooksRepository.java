package com.example.OnlineLibrarySW2.Repository;

import com.example.OnlineLibrarySW2.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BooksRepository extends JpaRepository<Books, Long> {
    Optional<Books> findByISBN(String ISBN);
}

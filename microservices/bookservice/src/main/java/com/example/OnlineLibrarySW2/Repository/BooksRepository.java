package com.example.OnlineLibrarySW2.Repository;

import com.example.OnlineLibrarySW2.Books;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
// import org.springframework.data.jpa.repository.Query;

// import java.util.List;


public interface BooksRepository extends JpaRepository<Books, String> {

    Optional<Books> findByIsbn(String s);
}

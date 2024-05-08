package com.example.OnlineLibrarySW2.Repository;

import com.example.OnlineLibrarySW2.Entity.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface BooksRepository extends JpaRepository<Books, String> {
        @Query("SELECT COUNT(b) FROM Books b WHERE b.stockNumber > 0")
        long countAvailableBooks();

        @Query("SELECT b FROM Books b WHERE b.stockNumber = (SELECT MAX(b.stockNumber) FROM Books b)")
        List<Books> findMostAvailableBook();

        @Query("SELECT b FROM Books b WHERE b.stockNumber = (SELECT MIN(b.stockNumber) FROM Books b)")
        List<Books> findLeastAvailableBook();

        @Query("SELECT b.category, COUNT(b) FROM Books b WHERE b.stockNumber > 0 GROUP BY b.category")
        List<Object[]> countAvailableBooksByCategory();


    }




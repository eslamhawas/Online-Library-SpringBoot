
package com.example.OnlineLibrarySW2.Repository;

import com.example.OnlineLibrarySW2.Entity.BorrowedBooks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface BorrowedBooksReportRepository extends JpaRepository<BorrowedBooks, Long> {
    @Query("SELECT COUNT(b) FROM BorrowedBooks b WHERE b.isAccepted = 'true'")
    long BorrowedBookscount();
    @Query("SELECT COUNT(DISTINCT b.user.id) FROM BorrowedBooks b WHERE b.isAccepted = 'true'")
    long userscount();
    @Query("SELECT new map(b.bookIsbnNavigation.title as title, COUNT(b.bookIsbnNavigation.ISBN) as count) " +
            "FROM BorrowedBooks b WHERE b.isAccepted = 'true' GROUP BY b.bookIsbnNavigation.title ORDER BY COUNT(b.bookIsbnNavigation.ISBN) DESC")
    List<Map<String, Object>> NumberOfMostBorrowedBooks();

    @Query("SELECT new map(b.bookIsbnNavigation.title as title, COUNT(b.bookIsbnNavigation) as count) " +
            "FROM BorrowedBooks b WHERE b.isAccepted = 'true' GROUP BY b.bookIsbnNavigation.title ORDER BY COUNT(b.bookIsbnNavigation) ASC")
    List<Map<String, Object>> NumberOfLeastorrowedBooks();
}


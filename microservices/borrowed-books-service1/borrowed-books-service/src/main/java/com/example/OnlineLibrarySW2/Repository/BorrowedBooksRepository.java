
package com.example.OnlineLibrarySW2.Repository;

import com.example.OnlineLibrarySW2.BorrowedBooks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BorrowedBooksRepository extends JpaRepository<BorrowedBooks, Long> {

    Optional<BorrowedBooks> findByOrderNumber(int orderNumber);
}


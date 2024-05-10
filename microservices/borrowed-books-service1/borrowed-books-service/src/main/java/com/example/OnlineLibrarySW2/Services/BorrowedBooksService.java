package com.example.OnlineLibrarySW2.Services;

import com.example.OnlineLibrarySW2.BorrowedBooks;
import com.example.OnlineLibrarySW2.Repository.BorrowedBooksRepository;
import com.example.OnlineLibrarySW2.dto.BorrowedBookRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BorrowedBooksService {

    private final BorrowedBooksRepository borrowedBooksRepository;

    @Autowired
    public BorrowedBooksService(BorrowedBooksRepository borrowedBooksRepository) {
        this.borrowedBooksRepository = borrowedBooksRepository;

    }

    public void addBorrowedBook(BorrowedBookRequestDTO requestDTO) {
        // Create borrowed book entity
        BorrowedBooks borrowedBook = new BorrowedBooks();
        borrowedBook.setDateOfReturn(null);
        borrowedBook.setIsAccepted("Pending");
        borrowedBook.setISBN(requestDTO.getBookIsbn());
        borrowedBook.setTitle(requestDTO.getTitle());
        borrowedBook.setPrice(requestDTO.getPrice());
        borrowedBook.setUserName(requestDTO.getUserName());
        borrowedBook.setUserId(requestDTO.getUserId());

        borrowedBooksRepository.save(borrowedBook);
    }

    public void updateBorrowedBook(Long orderNumber, String isAccepted, LocalDate dateOfReturn) {
        Optional<BorrowedBooks> optionalBorrowedBook = borrowedBooksRepository.findById(orderNumber);
        if (optionalBorrowedBook.isEmpty()) {
            throw new RuntimeException("Borrowed book not found");
        }
        BorrowedBooks borrowedBook = optionalBorrowedBook.get();

        borrowedBook.setIsAccepted(isAccepted);
        borrowedBook.setDateOfReturn(dateOfReturn);
        borrowedBooksRepository.save(borrowedBook);
    }

    public List<BorrowedBooks> getAllBorrowedBooks() {
        return borrowedBooksRepository.findAll();
    }

    public List<BorrowedBooks> getAllBorrowedBooksByUserId(Long userId) {
        return borrowedBooksRepository.findByUserId(userId);
    }

    public Optional<BorrowedBooks> deleteBorrowedBookByOrderNumber(Long orderNumber) {
        Optional<BorrowedBooks> optionalBorrowedBook = borrowedBooksRepository.findByOrderNumber(orderNumber);

        if (optionalBorrowedBook.isPresent()) {
            BorrowedBooks borrowedBook = optionalBorrowedBook.get();
            borrowedBooksRepository.delete(borrowedBook);
            return optionalBorrowedBook;
        } else {
            return Optional.empty();
        }
    }

}
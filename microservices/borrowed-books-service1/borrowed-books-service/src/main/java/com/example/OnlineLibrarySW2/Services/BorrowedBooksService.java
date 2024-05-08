package com.example.OnlineLibrarySW2.Services;

import com.example.OnlineLibrarySW2.dto.BorrowedBookRequestDTO;
import com.example.OnlineLibrarySW2.Books;
import com.example.OnlineLibrarySW2.BorrowedBooks;
import com.example.OnlineLibrarySW2.User;
import com.example.OnlineLibrarySW2.Repository.BooksRepository;
import com.example.OnlineLibrarySW2.Repository.BorrowedBooksRepository;
import com.example.OnlineLibrarySW2.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BorrowedBooksService {

    private final BorrowedBooksRepository borrowedBooksRepository;
    private final UsersRepository userRepository;
    private final BooksRepository booksRepository;

    @Autowired
    public BorrowedBooksService(BorrowedBooksRepository borrowedBooksRepository,
                               UsersRepository userRepository,
                               BooksRepository booksRepository) {
        this.borrowedBooksRepository = borrowedBooksRepository;
        this.userRepository = userRepository;
        this.booksRepository = booksRepository;
    }

    public void addBorrowedBook(BorrowedBookRequestDTO requestDTO) {
        // Find user by ID
        Optional<User> optionalUser = userRepository.findById(requestDTO.getUserId());
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = optionalUser.get();

        // Find book by ISBN
        Optional<Books> optionalBook = booksRepository.findByISBN(requestDTO.getBookIsbn());
        if (optionalBook.isEmpty()) {
            throw new RuntimeException("Book not found");
        }
        Books book = optionalBook.get();

        // Create borrowed book entity
        BorrowedBooks borrowedBook = new BorrowedBooks();
        borrowedBook.setBookIsbnNavigation(book);
        borrowedBook.setUser(user);
        // Set other properties as needed
        borrowedBook.setDateOfReturn(null);
        borrowedBook.setIsAccepted("Pending");
        // Save borrowed book
        borrowedBooksRepository.save(borrowedBook);
    }

    public void updateBorrowedBook(Long orderNumber, String isAccepted, LocalDate dateOfReturn) {
        // Find borrowed book by order number
        Optional<BorrowedBooks> optionalBorrowedBook = borrowedBooksRepository.findById(orderNumber);
        if (optionalBorrowedBook.isEmpty()) {
            throw new RuntimeException("Borrowed book not found");
        }
        BorrowedBooks borrowedBook = optionalBorrowedBook.get();

        // Update borrowed book properties
        borrowedBook.setIsAccepted(isAccepted);
        borrowedBook.setDateOfReturn(dateOfReturn);

        // Save updated borrowed book
        borrowedBooksRepository.save(borrowedBook);
    }

    public List<Map<String, Object>> getAllBorrowedBooks() {
        List<BorrowedBooks> borrowedBooks = borrowedBooksRepository.findAll();
        return borrowedBooks.stream()
                .map(this::convertBorrowedBookToMap)
                .collect(Collectors.toList());
    }

    public Map<String, Object> getBorrowedBookById(Long id) {
        Optional<BorrowedBooks> borrowedBookOptional = borrowedBooksRepository.findById(id);
        if (borrowedBookOptional.isPresent()) {
            BorrowedBooks borrowedBook = borrowedBookOptional.get();
            return convertBorrowedBookToMap(borrowedBook);
        } else {
            return new HashMap<>();
        }
    }

    public ResponseEntity<String> deleteBorrowedBook(int orderNumber) {
        Optional<BorrowedBooks> borrowedBookOptional = borrowedBooksRepository.findByOrderNumber(orderNumber);
        if (borrowedBookOptional.isPresent()) {
            borrowedBooksRepository.delete(borrowedBookOptional.get());
            return ResponseEntity.ok("Order number: " + orderNumber + " has been deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Borrowed book with order number " + orderNumber + " not found");
        }
    }

    private Map<String, Object> convertBorrowedBookToMap(BorrowedBooks borrowedBook) {
        Map<String, Object> response = new HashMap<>();
        response.put("dateOfReturn", borrowedBook.getDateOfReturn());
        response.put("orderNumber", borrowedBook.getOrderNumber());
        response.put("isAccepted", borrowedBook.getIsAccepted());


        Books book = borrowedBook.getBookIsbnNavigation();
        if (book != null) {
            response.put("bookIsbn", book.getISBN());
            response.put("bookTitle", book.getTitle());
            response.put("price", book.getPrice());
        } else {
            response.put("bookIsbn", null);
            response.put("bookTitle", null);
            response.put("price", null);
        }

        User user = borrowedBook.getUser();
        if (user != null) {
            response.put("userId", user.getId());
            response.put("userName", user.getUserName());
        } else {
            response.put("userId", null);
            response.put("userName", null);
        }

        return response;
    }
}

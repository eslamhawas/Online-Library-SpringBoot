package com.example.OnlineLibrarySW2.Controller;

import com.example.OnlineLibrarySW2.BorrowedBooks;
import com.example.OnlineLibrarySW2.Services.BorrowedBooksService;
import com.example.OnlineLibrarySW2.dto.BorrowedBookRequestDTO;
import com.example.OnlineLibrarySW2.dto.BorrowedBookUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/v1/borrowedBooks")
public class BorrowedBookController {

    private final BorrowedBooksService borrowedBooksService;

    @Autowired
    public BorrowedBookController(BorrowedBooksService borrowedBooksService) {
        this.borrowedBooksService = borrowedBooksService;
    }

    @GetMapping
    public ResponseEntity<List<BorrowedBooks>> getAllBorrowedBooks() {
        List<BorrowedBooks> borrowedBooks = borrowedBooksService.getAllBorrowedBooks();
        return new ResponseEntity<>(borrowedBooks, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<BorrowedBooks>> getAllBorrowedBooksByUserId(@PathVariable Long userId) {
        List<BorrowedBooks> borrowedBooks = borrowedBooksService.getAllBorrowedBooksByUserId(userId);
        return new ResponseEntity<>(borrowedBooks, HttpStatus.OK);
    }

    @DeleteMapping("/{orderNumber}")
    public ResponseEntity<String> deleteBorrowedBook(@PathVariable Long orderNumber) {
        borrowedBooksService.deleteBorrowedBookByOrderNumber(orderNumber);
        return ResponseEntity.ok("Deletion attempted for order number: " + orderNumber);
    }

    @PostMapping()
    public ResponseEntity<Void> addBorrowedBook(@RequestBody BorrowedBookRequestDTO borrowedBookRequestDTO) {
        borrowedBooksService.addBorrowedBook(borrowedBookRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/update")
    public ResponseEntity<Void> updateBorrowedBook(@RequestBody BorrowedBookUpdateDTO borrowedBookUpdateDTO) {
        Long orderNumber = borrowedBookUpdateDTO.getOrderNumber();
        String isAccepted = borrowedBookUpdateDTO.getIsAccepted();
        LocalDate dateOfReturn = borrowedBookUpdateDTO.getDateOfReturn();
        borrowedBooksService.updateBorrowedBook(orderNumber, isAccepted, dateOfReturn);
        return ResponseEntity.ok().build();
    }
}

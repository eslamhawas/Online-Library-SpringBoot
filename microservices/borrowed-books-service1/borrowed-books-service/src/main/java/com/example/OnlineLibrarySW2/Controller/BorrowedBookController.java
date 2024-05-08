package com.example.OnlineLibrarySW2.Controller;
import com.example.OnlineLibrarySW2.dto.BorrowedBookRequestDTO;
import com.example.OnlineLibrarySW2.dto.BorrowedBookUpdateDTO;
import com.example.OnlineLibrarySW2.Services.BorrowedBooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/borrowedBooks")
public class BorrowedBookController {

    private final BorrowedBooksService borrowedBooksService;

    @Autowired
    public BorrowedBookController(BorrowedBooksService borrowedBooksService) {
        this.borrowedBooksService = borrowedBooksService;
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getBorrowedBooks() {
        List<Map<String, Object>> borrowedBooks = borrowedBooksService.getAllBorrowedBooks();
        return ResponseEntity.ok(borrowedBooks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getBorrowedBookById(@PathVariable Long id) {
        Map<String, Object> response = borrowedBooksService.getBorrowedBookById(id);
        if (response.isEmpty()) {

            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @DeleteMapping("/{orderNumber}")
    public ResponseEntity<String> deleteBorrowedBook(@PathVariable int orderNumber) {
        borrowedBooksService.deleteBorrowedBook(orderNumber);
        return ResponseEntity.ok("Deletion attempted for order number: " + orderNumber);
    }


    @PostMapping("/add")
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

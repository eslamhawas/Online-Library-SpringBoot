package com.example.OnlineLibrarySW2.Controller;

import com.example.OnlineLibrarySW2.Entity.BookDTO;
import com.example.OnlineLibrarySW2.Entity.Books;
import com.example.OnlineLibrarySW2.Services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/v1/Book")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookController {

    @Autowired
    private BookService _bookService;


    @GetMapping()
    public ResponseEntity<List<Books>> getAllBooks() {

        return _bookService.getAllBooks();
    }

    @PostMapping()
    public ResponseEntity<Books> AddBook(@RequestBody BookDTO book) {
        return _bookService.addBook(book);
    }

    @PutMapping("/update")
    public ResponseEntity<Books> updateBook(@RequestBody BookDTO updatedBook) {

        return _bookService.updateBook(updatedBook);

    }


    @DeleteMapping("/{ISBN}")
    public ResponseEntity<Void> deleteBook(@PathVariable String ISBN) {
        _bookService.deleteBookByISBN(ISBN);
        return ResponseEntity.noContent().build();
    }
}

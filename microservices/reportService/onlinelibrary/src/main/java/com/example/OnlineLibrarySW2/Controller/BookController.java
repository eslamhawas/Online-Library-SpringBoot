package com.example.OnlineLibrarySW2.Controller;

import com.example.OnlineLibrarySW2.Entity.Books;
import com.example.OnlineLibrarySW2.Repository.BooksRepository;
import com.example.OnlineLibrarySW2.Services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000") // Replace with your React app's origin
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BooksRepository bookRepository;

    @GetMapping("/Book")
    public ResponseEntity<List<Books>> Getallbooks() {
        List<Books> books = bookRepository.findAll();
        return ResponseEntity.ok(books);
    }

    @PostMapping("/book/add")
    public void AddBook(@RequestBody Books book){
        bookService.AddBook(book);

    }

    @PutMapping("/book/update")
    public HttpStatus updateBook(@RequestBody Books updatedBook) {
        return bookService.updateBook(updatedBook);
    }



    @DeleteMapping("/{ISBN}")
    public ResponseEntity<Void> deleteBook(@PathVariable String ISBN) {
        bookService.deleteBookByISBN(ISBN);
        return ResponseEntity.noContent().build();
    }
}

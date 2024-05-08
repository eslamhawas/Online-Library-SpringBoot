package com.example.OnlineLibrarySW2.Controller;

import com.example.OnlineLibrarySW2.Books;
import com.example.OnlineLibrarySW2.Repository.BooksRepository;
import com.example.OnlineLibrarySW2.Services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// @RestController
// @RequestMapping("/api/v1")

// public class BookController {
//     @Autowired
//     private BookService bookService;
//     @Autowired
//     BooksRepository bookRepository;

//     @GetMapping("/Book")
//     public List<Books> Getallbooks() {
//         List<Books> books = bookRepository.findAll();
//         return books;
//     }

//     @PostMapping("/add")
//     public void AddBook(@RequestBody Books book) {
//         bookRepository.save(book);
//     }

//     @PutMapping("/update")
//     public HttpStatus updateBook(@RequestBody Books updatedBook) {
//         if (!isValid(updatedBook)) {
//             return HttpStatus.BAD_REQUEST;
//         }

//         Optional<Books> existingBookOptional = bookRepository.findById(updatedBook.getISBN());

//         if (existingBookOptional.isEmpty()) {
//             return HttpStatus.NOT_FOUND;
//         }

//         Books existingBook = existingBookOptional.get();
//         existingBook.setTitle(updatedBook.getTitle());
//         existingBook.setRackNumber(updatedBook.getRackNumber());
//         existingBook.setCategory(updatedBook.getCategory());
//         existingBook.setPrice(updatedBook.getPrice());
//         existingBook.setStockNumber(updatedBook.getStockNumber());

//         bookRepository.save(existingBook);

//         return HttpStatus.OK;
//     }

//     // Validate the updated book object
//     private boolean isValid(Books book) {
//         // You can add your validation logic here
//         return book != null;
//     }

//     @DeleteMapping("/{ISBN}")
//     public void deleteBook(@PathVariable String ISBN) {
//         bookService.deleteBookByISBN(ISBN);

//     }

// }

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000") // Replace with your React app's origin
public class BookController {

    @Autowired
    private BookService bookService;


    @GetMapping("/Book")
    public ResponseEntity<List<Books>> Getallbooks() {
        List<Books> books = bookService.getAllBooks();
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

    // Validate the updated book object
    private boolean isValid(Books book) {
        // Add your validation logic here
        return book != null;
    }

    @DeleteMapping("/{ISBN}")
    public ResponseEntity<Void> deleteBook(@PathVariable String ISBN) {
        bookService.deleteBookByISBN(ISBN);
        return ResponseEntity.noContent().build();
    }
}

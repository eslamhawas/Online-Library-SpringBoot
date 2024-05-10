package com.example.OnlineLibrarySW2.Services;

import com.example.OnlineLibrarySW2.Entity.BookDTO;
import com.example.OnlineLibrarySW2.Entity.Books;
import com.example.OnlineLibrarySW2.Repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service

public class BookService {
    @Autowired
    private BooksRepository bookRepository;


    public ResponseEntity<List<Books>> getAllBooks() {
        List<Books> books = bookRepository.findAll();
        return ResponseEntity.ok(books);
    }

    public ResponseEntity<Books> addBook(BookDTO book) {
        Books NewBooks= new Books();
        NewBooks.setTitle(book.getTitle());
        NewBooks.setCategory(book.getCategory());
        NewBooks.setPrice(book.getPrice());
        NewBooks.setRackNumber(book.getRackNumber());
        NewBooks.setStockNumber(book.getStockNumber());
        bookRepository.save(NewBooks);
        return ResponseEntity.status(HttpStatus.CREATED).body(NewBooks);
    }

    public ResponseEntity<Books> updateBook(BookDTO updatedBook) {


        Optional<Books> existingBookOptional = bookRepository.findById(updatedBook.getIsbn());

        if (existingBookOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Books existingBook = existingBookOptional.get();
        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setRackNumber(updatedBook.getRackNumber());
        existingBook.setCategory(updatedBook.getCategory());
        existingBook.setPrice(updatedBook.getPrice());
        existingBook.setStockNumber(updatedBook.getStockNumber());

        bookRepository.save(existingBook);

        return ResponseEntity.status(HttpStatus.OK).body(existingBook);

    }

    public void deleteBookByISBN(String ISBN) {
        bookRepository.deleteById(ISBN);
    }

}

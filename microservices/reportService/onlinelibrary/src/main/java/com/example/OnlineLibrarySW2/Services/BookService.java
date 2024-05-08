package com.example.OnlineLibrarySW2.Services;

import com.example.OnlineLibrarySW2.Entity.Books;
import com.example.OnlineLibrarySW2.Repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service

public class BookService {
    @Autowired
    private BooksRepository repo;



    public List<Books> getAllBooks() {
        return repo.findAll();
    }

    public void deleteBookByISBN(String ISBN) {
        repo.deleteById(ISBN);
    }

    public void AddBook (Books book){
        repo.save(book);
    }
    public HttpStatus updateBook(Books updatedBook) {
        if (!isValid(updatedBook)) {
            return HttpStatus.BAD_REQUEST;
        }

        Optional<Books> existingBookOptional = repo.findById(updatedBook.getISBN());

        if (existingBookOptional.isEmpty()) {
            return HttpStatus.NOT_FOUND;
        }

        Books existingBook = existingBookOptional.get();
        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setRackNumber(updatedBook.getRackNumber());
        existingBook.setCategory(updatedBook.getCategory());
        existingBook.setPrice(updatedBook.getPrice());
        existingBook.setStockNumber(updatedBook.getStockNumber());

        repo.save(existingBook);

        return HttpStatus.OK;
    }
    private boolean isValid(Books book) {
        // You can add your validation logic here
        return book != null;
    }

}

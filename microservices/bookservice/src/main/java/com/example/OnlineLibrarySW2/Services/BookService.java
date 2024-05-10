package com.example.OnlineLibrarySW2.Services;
import com.example.OnlineLibrarySW2.BookDTO;
import com.example.OnlineLibrarySW2.Books;
import com.example.OnlineLibrarySW2.Repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;


@Service

public class BookService {
    @Autowired
    private BooksRepository bookRepository;

    private final RestTemplate restTemplate;

    public BookService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


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
        try {

            // change to localhost to report-service to be able
            // to use RestTemplate Communication between services inside docker

            String reportservice = "http://localhost:8081/api/v1/Book";

            restTemplate.postForEntity(reportservice, book, Books.class);
        } catch (RestClientException e) {
            System.out.println("Error Adding book: " + e.getMessage());
        }
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
        HttpEntity<BookDTO> requestEntity = new HttpEntity<>(updatedBook);

        try {
            // change to localhost to report-service to be able
            // to use RestTemplate Communication between services inside docker

            String reportservice = "http://localhost:8081/api/v1/Book/update";
            ResponseEntity<String> reportResponse = restTemplate.exchange(reportservice, HttpMethod.PUT, requestEntity, String.class);
        } catch (RestClientException e) {
            System.out.println("Error Editing book: " + e.getMessage());
        }

        bookRepository.save(existingBook);

        return ResponseEntity.status(HttpStatus.OK).body(existingBook);

    }

    public void deleteBookByISBN(String ISBN) {
        // change to localhost to report-service to be able
        // to use RestTemplate Communication between services inside docker

        String reportService = "http://localhost:8081/api/v1/Book/"+ISBN;
        try {
            restTemplate.delete(reportService);
            System.out.println("Resource deleted successfully!");
        } catch (RestClientException e) {
            System.out.println("Error deleting book: " + e.getMessage());
        }
        bookRepository.deleteById(ISBN);
    }

}

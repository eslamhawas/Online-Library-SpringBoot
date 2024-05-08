package com.example.OnlineLibrarySW2.Services;
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
    private BooksRepository repo;

    private final RestTemplate restTemplate;

    public BookService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public List<Books> getAllBooks() {
        return repo.findAll();
    }

    public void deleteBookByISBN(String ISBN) {
        String completeUrl="http://report-service:8081/api/v1/"+ISBN;
        try {
            restTemplate.delete(completeUrl);
        } catch (RestClientException ignored) {

        }

        repo.deleteById(ISBN);
    }

    public void AddBook (Books book){

        try {
           String reportservice = "http://report-service:8081/api/v1/book/add";

           restTemplate.postForEntity(reportservice, book, Void.class);
        } catch (Exception ignored) {

        }

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
        HttpEntity<Books> requestEntity = new HttpEntity<>(updatedBook);
        try{
            String reportservice = "http://report-service:8081/api/v1/book/update";
            ResponseEntity<String> reportResponse = restTemplate.exchange(reportservice, HttpMethod.PUT, requestEntity, String.class);
        }catch (RestClientException ignored) {

        }


        repo.save(existingBook);

        return HttpStatus.OK;
    }
    private boolean isValid(Books book) {
        // You can add your validation logic here
        return book != null;
    }

}

package com.example.OnlineLibrarySW2.Repository;

import com.example.OnlineLibrarySW2.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface BooksRepository extends JpaRepository<Books, String> {

}

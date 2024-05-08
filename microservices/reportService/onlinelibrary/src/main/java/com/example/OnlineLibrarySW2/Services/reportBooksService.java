package com.example.OnlineLibrarySW2.Services;

import com.example.OnlineLibrarySW2.Repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.OnlineLibrarySW2.Entity.Books;

import java.util.List;

@Service
public class reportBooksService {
    @Autowired
    private BooksRepository repo;

    public long countAvailableBooks() {
        return repo.countAvailableBooks();
    }

    public List<Books> findMostAvailableBook() {
        return repo.findMostAvailableBook();
    }

    public List<Books> findLeastAvailableBook() {
        return repo.findLeastAvailableBook();
    }

    public List<Object[]> countAvailableBooksByCategory() {
        return repo.countAvailableBooksByCategory();
    }

    public String reportOfBooks(){
        long numberofavailablebooks=countAvailableBooks();
        List<Books> mostAvailableBook = findMostAvailableBook();
        List<Books> leastAvailableBook = findLeastAvailableBook();
        List<Object[]> availableBooksByCategory = countAvailableBooksByCategory();

        StringBuilder report= new StringBuilder();
        report.append("The number of available books is").append(numberofavailablebooks).append("\n");
        if (!mostAvailableBook.isEmpty()){
            report.append("The most available book is:");
            for (Books book : mostAvailableBook) {
                report.append("- ").append(book.getTitle()).append("\n");
            }
        }
        else {
            report.append("There are no available books to determine the most available book \n");
        }
        if (!leastAvailableBook.isEmpty()){
            report.append("The Least available book is:");
            for (Books book : leastAvailableBook) {
                report.append("- ").append(book.getTitle()).append("\n");
            }
        }
        else {
            report.append("There are no available books to determine the least available book").append("\n");
        }
        report.append("The number of available books for each category:\n");
        for (Object[] result : availableBooksByCategory) {
            String category = (String) result[0];
            long count = (long) result[1];
            report.append("- Category: ").append(category).append(", Count: ").append(count).append("\n");
        }

        return report.toString();
    }

}

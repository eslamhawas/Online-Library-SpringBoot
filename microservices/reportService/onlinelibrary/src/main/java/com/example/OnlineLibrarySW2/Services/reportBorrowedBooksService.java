package com.example.OnlineLibrarySW2.Services;

import com.example.OnlineLibrarySW2.Repository.BorrowedBooksReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class reportBorrowedBooksService {

    @Autowired
    private BorrowedBooksReportRepository borrowedBooksRepository;


    public long borrowedBooksCount() {
        return borrowedBooksRepository.BorrowedBookscount();
    }

    public long usersCount() {
        return borrowedBooksRepository.userscount();
    }

    public List<Map<String, Object>> numberOfMostBorrowedBooks() {
        return borrowedBooksRepository.NumberOfMostBorrowedBooks();
    }

    public List<Map<String, Object>> numberOfLeastBorrowedBooks() {
        return borrowedBooksRepository.NumberOfLeastorrowedBooks();
    }
     public  String ReportofBorrowedBooks(){
        long totalBorrowedBooks =  borrowedBooksRepository.BorrowedBookscount();
        long usernumber = borrowedBooksRepository.userscount();
        List<Map<String,Object>>mostborrowedbooks=  borrowedBooksRepository.NumberOfMostBorrowedBooks();
        List<Map<String,Object>>leastborrowedbooks=borrowedBooksRepository.NumberOfLeastorrowedBooks();


        StringBuilder report= new StringBuilder();
        report.append("Total Borrowed Books is :").append(totalBorrowedBooks).append("\n");
        report.append("Total Users number is  :").append(usernumber).append("\n");
        report.append("The Most Borrowed Book is :\n");
        if (!mostborrowedbooks.isEmpty()) {
            Map<String, Object> mostBorrowedBook = mostborrowedbooks.get(0);
            report.append(mostBorrowedBook.get("title")).append(": ").append(mostBorrowedBook.get("count")).append("\n");
        }

        report.append("The Least Borrowed Book is :\n");
        if (!leastborrowedbooks.isEmpty()) {
            Map<String, Object> leastBorrowedBook = leastborrowedbooks.get(0);
            report.append(leastBorrowedBook.get("title")).append(": ").append(leastBorrowedBook.get("count")).append("\n");
        }

        return report.toString();

    }
}

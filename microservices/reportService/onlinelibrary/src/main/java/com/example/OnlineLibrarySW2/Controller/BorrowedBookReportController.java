

package com.example.OnlineLibrarySW2.Controller;

import com.example.OnlineLibrarySW2.Services.reportBorrowedBooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/v1/borrowedBooks")
public class BorrowedBookReportController {

    @Autowired
    private reportBorrowedBooksService borrowedBookService;

    @GetMapping("/report")
    public String getborrowedbooksreport(){
        return  borrowedBookService.ReportofBorrowedBooks();
    }
}



package com.example.OnlineLibrarySW2.Controller;

import com.example.OnlineLibrarySW2.Services.reportBorrowedBooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://example.com", "http://localhost:*"})
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

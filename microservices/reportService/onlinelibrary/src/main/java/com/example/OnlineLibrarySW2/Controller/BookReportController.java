package com.example.OnlineLibrarySW2.Controller;

import com.example.OnlineLibrarySW2.Entity.UserRegisterDto;
import com.example.OnlineLibrarySW2.Services.AuthService;
import com.example.OnlineLibrarySW2.Services.reportBooksService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://example.com", "http://localhost:*"})
@RestController
@RequestMapping("api/v1")
public class BookReportController{
    @Autowired
    private reportBooksService reportBooksService;
    @Autowired
    private AuthService _authService;


    @GetMapping("/report")
    public String getbooksreport(){
        return reportBooksService.reportOfBooks();
    }

    @PostMapping("/Register")
    public ResponseEntity<String> Register(@RequestBody UserRegisterDto userdto){

        return _authService.signup(userdto);
    }


}

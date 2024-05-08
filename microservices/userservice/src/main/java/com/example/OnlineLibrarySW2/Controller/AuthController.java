package com.example.OnlineLibrarySW2.Controller;



import com.example.OnlineLibrarySW2.Entity.UserLoginDto;
import com.example.OnlineLibrarySW2.Entity.UserRegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.OnlineLibrarySW2.Services.AuthService;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/v1/")
public class AuthController {

    @Autowired
    private AuthService _authService;


    @PostMapping("/Login")
    public ResponseEntity<String> login(@RequestBody UserLoginDto userLoginDto){
        return _authService.login(userLoginDto);
    }
        @PostMapping("/Register")
    public ResponseEntity<String> Register(@RequestBody UserRegisterDto userdto){

        return _authService.signup(userdto);
    }
}

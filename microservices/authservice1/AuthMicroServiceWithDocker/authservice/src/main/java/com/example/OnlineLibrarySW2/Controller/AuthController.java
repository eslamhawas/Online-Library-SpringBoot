package com.example.OnlineLibrarySW2.Controller;


import com.example.OnlineLibrarySW2.Entity.*;
import com.example.OnlineLibrarySW2.Repository.UsersRepository;
import com.example.OnlineLibrarySW2.Services.AuthService;
import com.example.OnlineLibrarySW2.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/v1/")
public class AuthController {

    @Autowired
    private AuthService _authService;

    @Autowired
    private UserService _userService;


    @PostMapping("/Login")
    public ResponseEntity<String> login(@RequestBody UserLoginDto userLoginDto){
        return _authService.login(userLoginDto);
    }
        @PostMapping("/Register")
    public ResponseEntity<String> Register(@RequestBody UserRegisterDto userdto){

        return _authService.signup(userdto);
    }
    @PutMapping("users/Modify/{option}")
    public ResponseEntity<String> modifyUser(@PathVariable int option,
                                            @RequestBody modifyuserdto modifyuserdto) {
        // Call the modifyUser method from the UserService
        return _userService.modifyUser(option, modifyuserdto);
    }

}

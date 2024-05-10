package com.example.OnlineLibrarySW2.Entity;

import jakarta.validation.constraints.Email;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRegisterDto {
    private String userName;
    @Email(message = "Invalid email format")
    private String email;
    private String password;
    private  String rePassword;
    private LocalDate dateOfBirth;


}

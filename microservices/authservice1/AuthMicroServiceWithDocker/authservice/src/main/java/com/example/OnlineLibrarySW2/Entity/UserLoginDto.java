package com.example.OnlineLibrarySW2.Entity;



import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.constraints.Email;
import lombok.Data;


@Data
public class UserLoginDto {
    @Email(message = "Invalid email format")
    private String email;
    private String password;
}


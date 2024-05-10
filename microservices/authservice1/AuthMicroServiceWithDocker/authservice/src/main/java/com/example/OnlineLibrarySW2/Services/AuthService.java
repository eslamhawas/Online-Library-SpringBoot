package com.example.OnlineLibrarySW2.Services;


import com.example.OnlineLibrarySW2.Entity.User;
import com.example.OnlineLibrarySW2.Entity.UserLoginDto;
import com.example.OnlineLibrarySW2.Entity.UserRegisterDto;
import com.example.OnlineLibrarySW2.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UsersRepository _usersRepository;

    @Autowired
    private final RestTemplate restTemplate;

    public AuthService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<String> login(UserLoginDto user) {
        Optional<User> existingUser= _usersRepository.findByEmail(user.getEmail());
        if(existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There Is no User With this credentials");
        }
        if(!user.getPassword().equals(existingUser.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There Is no User With this credentials");
        }
        User user2 = existingUser.get();
        return ResponseEntity.status(HttpStatus.OK).body(user2.getId()+"");
    }


    public ResponseEntity<String> signup(UserRegisterDto userRegisterDto) {
        if(!userRegisterDto.getPassword().equals(userRegisterDto.getRePassword())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password And Confirm Password Doesn't Match");
        }
        Optional<User> existingEmail= _usersRepository.findByEmail(userRegisterDto.getEmail());
        Optional<User> existingUsername= _usersRepository.findByUserName(userRegisterDto.getUserName());
        if(existingEmail.isPresent() || existingUsername.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or email already exists");
        }
        User user = new User();
        user.setUserName(userRegisterDto.getUserName());
        user.setEmail(userRegisterDto.getEmail());
        user.setDateOfBirth(userRegisterDto.getDateOfBirth());
        user.setPassword(userRegisterDto.getPassword());
        if(_usersRepository.count()==0){
            user.setIsAccepted("true");
            user.setIsAdmin("true");
        }else {
            user.setIsAccepted("null");
            user.setIsAdmin("false");
        }
        try{
            // change localhost:8084 to user-service to be able
            // to use RestTemplate Communication between services inside docker

            String userservice = "http://localhost:8084/api/v1/Register";

            restTemplate.postForEntity(userservice, userRegisterDto, String.class);

        } catch (RestClientException e) {
            System.out.println("Error adding user: " + e.getMessage());
        }
        try{
            // change localhost:8081 to report-service to be able
            // to use RestTemplate Communication between services inside docker

            String reportservice = "http://localhost:8081/api/v1/Register";

            restTemplate.postForEntity(reportservice, userRegisterDto, String.class);
        } catch (RestClientException e) {
            System.out.println("Error adding user: " + e.getMessage());
        }


        _usersRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("Signed up Successfully");

    }
}

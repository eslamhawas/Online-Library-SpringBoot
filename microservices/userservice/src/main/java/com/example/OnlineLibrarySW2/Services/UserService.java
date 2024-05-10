package com.example.OnlineLibrarySW2.Services;

import com.example.OnlineLibrarySW2.Entity.User;
import com.example.OnlineLibrarySW2.Entity.modifyuserdto;
import com.example.OnlineLibrarySW2.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RestTemplate restTemplate;

    // @Override
    public ResponseEntity<String> modifyUser(int option, modifyuserdto userdto) {




        // Retrieve the user by ID
        Optional<User> userOptional = userRepository.findById(userdto.getUserid());
        if (userOptional.isEmpty()) {
            // If the user is not found, return a 404 Not Found response
            return ResponseEntity.notFound().build();
        }

        // Get the user model
        User user = userOptional.get();

        // Update user fields based on the provided option
        switch (option) {
            case 0:
                user.setIsAccepted("true");
                break;
            case 1:
                user.setIsAccepted("false");
                break;
            case 2:
                user.setIsAdmin("true");
                break;
            case 3:
                user.setIsAdmin("false");
                break;
            default:
                // Return 400 Bad Request for an invalid option
                return ResponseEntity.badRequest().body("Invalid option provided");
        }
        // change localhost:8080 to auth-service to be able
        // to use RestTemplate Communication between services inside docker
        String authUrl = "http://localhost:8080/api/v1/users/Modify/"+option;
        // change localhost:8081 to report-service to be able
        // to use RestTemplate Communication between services inside docker
        String reportUrl = "http://localhost:8081/api/v1/users/Modify/"+option;

        HttpEntity<modifyuserdto> requestEntity = new HttpEntity<>(userdto);

        try {
            ResponseEntity<String> authResponse = restTemplate.exchange(authUrl, HttpMethod.PUT, requestEntity, String.class);
        } catch (RestClientException e) {
            System.out.println("Error Modifying user: " + e.getMessage());
        }
        try {
            ResponseEntity<String> reportResponse = restTemplate.exchange(reportUrl, HttpMethod.PUT, requestEntity, String.class);
        } catch (RestClientException e) {
            System.out.println("Error Modifying user: " + e.getMessage());
        }

        userRepository.save(user);

        return ResponseEntity.ok("User modified successfully");
    }

    private Map<String, Object> convertUserToMap(User User) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", User.getId());
        response.put("email", User.getEmail());
        response.put("userName", User.getUserName());
        response.put("isAccepted", User.getIsAccepted());
        return response;
    }

    // @Override
    public Map<String, Object> getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return convertUserToMap(user);
        } else {
            return new HashMap<>();
        }
    }

    public List<User> GetAll() {
        return userRepository.findAll();
    }
}

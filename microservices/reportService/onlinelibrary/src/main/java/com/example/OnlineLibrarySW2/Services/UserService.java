package com.example.OnlineLibrarySW2.Services;

import com.example.OnlineLibrarySW2.Entity.User;
import com.example.OnlineLibrarySW2.Entity.modifyuserdto;
import com.example.OnlineLibrarySW2.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UsersRepository userRepository;
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



        // Save the modified user back to the repository
        userRepository.save(user);

        // Return 200 OK response indicating the operation was successful
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

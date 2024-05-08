package com.example.OnlineLibrarySW2;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import java.time.LocalDate;
@Entity
@Data
@Table(name="User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "userName")
    private String userName;
    @Column(name = "dateOfBirth")
    private LocalDate dateOfBirth;
    @Column(name = "email")
    @Email(message = "Invalid email format")
    private String email;
    @Column(name = "isAdmin")
    private String isAdmin;
    @Column(name = "isAccepted")
    private String isAccepted;
    private String password;


    public User(){

    }
    public User(String userName, LocalDate dateOfBirth, String email, String isAdmin, String isAccepted, String password) {
        this.userName = userName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.isAdmin = isAdmin;
        this.isAccepted = isAccepted;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(String isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getIsAccepted() {
        return isAccepted;
    }

    public void setIsAccepted(String isAccepted) {
        this.isAccepted = isAccepted;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
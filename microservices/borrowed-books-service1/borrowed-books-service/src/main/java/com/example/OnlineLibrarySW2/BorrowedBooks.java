package com.example.OnlineLibrarySW2;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
@Entity
@Data

@Table(name = "BorrowedBooks")
public class BorrowedBooks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderNumber")
    private Long orderNumber;
    @Column(name = "dateOfReturn")
    private LocalDate dateOfReturn;
    @Column(name = "isAccepted")
    private String isAccepted;
    @Column(name="price")
    private int price;
    @Column(name="isbn")
    private String ISBN;
    @Column(name = "userName")
    private String userName;
    @Column(name = "userId")
    private Long userId;
    @Column(name="title")
    private String title;
    public BorrowedBooks(LocalDate dateOfReturn, Long orderNumber, String isAccepted,int price,String ISBN,String title,String userName,Long userId) {
        this.dateOfReturn = dateOfReturn;
        this.orderNumber = orderNumber;
        this.isAccepted = isAccepted;
        this.price =price;
        this.ISBN =ISBN;
        this.title =title;
        this.userName=userName;
        this.userId =userId;
    }

    public BorrowedBooks() {

    }
}

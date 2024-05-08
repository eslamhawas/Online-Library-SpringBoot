package com.example.OnlineLibrarySW2.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import com.example.OnlineLibrarySW2.Entity.Books;
import java.time.LocalDate;
import java.util.Date;


@Entity
@Data
@Getter
@Setter
@Table(name = "BorrowedBooks")
public class BorrowedBooks {
    @Id
    @Column(name = "orderNumber")
    private Long orderNumber;
    @Column(name = "dateOfReturn")
    private LocalDate dateOfReturn;
    @Column(name = "isAccepted")
    private String isAccepted;

    @ManyToOne
    @JoinColumn(name = "bookIsbn", referencedColumnName = "isbn")
    private Books bookIsbnNavigation;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    public  BorrowedBooks(){

    }
    public BorrowedBooks(LocalDate dateOfReturn, Long orderNumber, String isAccepted, Books book, User user) {
        this.dateOfReturn = dateOfReturn;
        this.orderNumber = orderNumber;
        this.isAccepted = isAccepted;
        this.bookIsbnNavigation = book;
        this.user = user;
    }

}

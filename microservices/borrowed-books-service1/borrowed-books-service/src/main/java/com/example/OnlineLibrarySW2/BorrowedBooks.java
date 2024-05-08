package com.example.OnlineLibrarySW2;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
@Entity
@Data
@Getter
@Setter
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

    public Long getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Long orderNumber) {
        this.orderNumber = orderNumber;
    }

    public LocalDate getDateOfReturn() {
        return dateOfReturn;
    }

    public void setDateOfReturn(LocalDate dateOfReturn) {
        this.dateOfReturn = dateOfReturn;
    }

    public String getIsAccepted() {
        return isAccepted;
    }

    public void setIsAccepted(String isAccepted) {
        this.isAccepted = isAccepted;
    }

    public Books getBookIsbnNavigation() {
        return bookIsbnNavigation;
    }

    public void setBookIsbnNavigation(Books bookIsbnNavigation) {
        this.bookIsbnNavigation = bookIsbnNavigation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

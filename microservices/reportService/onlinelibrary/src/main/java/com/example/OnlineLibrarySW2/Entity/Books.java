package com.example.OnlineLibrarySW2.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Table(name="Books")
public class Books {
    @Id
    @Column(name="isbn")
    private String ISBN;
    @Column(name="title")
    private String title;
    @Column(name="category")
    private String category;
    @Column(name="rackNumber")
    private String rackNumber;
    @Column(name="price")
    private int price;
    @Column(name="stockNumber")
    private int stockNumber;
    public Books(){

    }
    public Books(String ISBN, String title, String category, String rackNumber, int price, int stockNumber) {
        this.ISBN = ISBN;
        this.title = title;
        this.category = category;
        this.rackNumber = rackNumber;
        this.price = price;
        this.stockNumber = stockNumber;
    }


}
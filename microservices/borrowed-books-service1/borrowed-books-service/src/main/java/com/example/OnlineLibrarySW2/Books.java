package com.example.OnlineLibrarySW2;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
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

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getRackNumber() {
        return rackNumber;
    }

    public void setRackNumber(String rackNumber) {
        this.rackNumber = rackNumber;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getStockNumber() {
        return stockNumber;
    }

    public void setStockNumber(int stockNumber) {
        this.stockNumber = stockNumber;
    }
}
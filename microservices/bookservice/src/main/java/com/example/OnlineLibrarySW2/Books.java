package com.example.OnlineLibrarySW2;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Random;

@Entity
@Getter
@Setter
@Table(name="Books")
public class Books {
    //made isbn set to a random value to avoid
    //"Id must be defined before using presist()" error in spring boot
    private static Random random (){
        return new Random();
    }
    private static String ISBN(int len){
        String alpha = "ABCDEFGHIJKLMNOPQRSTWVXYUYZ";
        StringBuilder Random= new StringBuilder();
        for (int i = 0; i < len; i++) {
            Random.append(alpha.charAt(random().nextInt(22)));
        }
        return Random.toString();
    }
    @Id
    @Column(name="isbn")
    private String isbn=ISBN(13);
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
    public Books(String title, String category, String rackNumber, int price, int stockNumber) {
        this.title = title;
        this.category = category;
        this.rackNumber = rackNumber;
        this.price = price;
        this.stockNumber = stockNumber;
    }





}
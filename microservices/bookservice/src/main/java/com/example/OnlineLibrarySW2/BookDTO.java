package com.example.OnlineLibrarySW2;


import lombok.Data;

@Data
public class BookDTO {
    private String isbn;
    private String title;
    private String category;
    private String rackNumber;
    private int price;
    private int stockNumber;
}

package com.example.OnlineLibrarySW2.dto;

import lombok.Data;

@Data
public class BorrowedBookRequestDTO {
    private String bookIsbn;
    private Long userId;
    private String title;
    private int price;
    private String userName;
    public BorrowedBookRequestDTO() {
    }

    public BorrowedBookRequestDTO(String bookIsbn, Long userId) {
        this.bookIsbn = bookIsbn;
        this.userId = userId;
    }

}
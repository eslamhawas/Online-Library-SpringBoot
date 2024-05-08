package com.example.OnlineLibrarySW2.dto;

import lombok.Data;

@Data
public class BorrowedBookRequestDTO {
    private String bookIsbn;
    private Long userId;

    public BorrowedBookRequestDTO() {
    }

    public BorrowedBookRequestDTO(String bookIsbn, Long userId) {
        this.bookIsbn = bookIsbn;
        this.userId = userId;
    }

    public String getBookIsbn() {
        return bookIsbn;
    }

    public void setBookIsbn(String bookIsbn) {
        this.bookIsbn = bookIsbn;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "BorrowedBookRequestDTO{" +
                "bookISBN='" + bookIsbn + '\'' +
                ", userId=" + userId +
                '}';
    }
}
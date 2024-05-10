package com.example.OnlineLibrarySW2.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BorrowedBookUpdateDTO {
    private Long orderNumber;
    private String isAccepted;
    private LocalDate dateOfReturn;



    public BorrowedBookUpdateDTO(Long orderNumber, String isAccepted, LocalDate dateOfReturn) {
        this.orderNumber = orderNumber;
        this.isAccepted = isAccepted;
        this.dateOfReturn = dateOfReturn;
    }


    
}
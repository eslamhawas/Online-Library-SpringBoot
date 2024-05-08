package com.example.OnlineLibrarySW2.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter

@Data
public class BorrowedBookUpdateDTO {
    private Long orderNumber;
    private String isAccepted;
    private LocalDate dateOfReturn;

    public BorrowedBookUpdateDTO() {
    }

    public BorrowedBookUpdateDTO(Long orderNumber, String isAccepted, LocalDate dateOfReturn) {
        this.orderNumber = orderNumber;
        this.isAccepted = isAccepted;
        this.dateOfReturn = dateOfReturn;
    }

    public Long getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Long orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getIsAccepted() {
        return isAccepted;
    }

    public void setIsAccepted(String isAccepted) {
        this.isAccepted = isAccepted;
    }

    public LocalDate getDateOfReturn() {
        return dateOfReturn;
    }

    public void setDateOfReturn(LocalDate dateOfReturn) {
        this.dateOfReturn = dateOfReturn;
    }

    @Override
    public String toString() {
        return "BorrowedBookUpdateDTO{" +
                "orderNumber=" + orderNumber +
                ", isAccepted='" + isAccepted + '\'' +
                ", dateOfReturn=" + dateOfReturn +
                '}';
    }
}
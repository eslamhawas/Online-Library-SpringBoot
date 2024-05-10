import axios from "axios";

export const deleteBorrowedBook = async (orderNumber) => {
  let token = localStorage.getItem("token");
  console.log("token : ", token);
  try {
    let message = await axios.delete(
      `http://localhost:8083/api/v1/borrowedBooks/${orderNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    return message.data;
  } catch (error) {
    return error.message;
  }
};

export const addBorrowedBook = async (book, userId) => {
  userId = parseInt(userId);
  try {
    let message = await axios.post(
      `http://localhost:8083/api/v1/borrowedBooks`,
      { ...book, userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // localStorage.setItem("shoppingCart" , JSON.stringify(shoppingCart))
    return message.data;
  } catch (error) {
    return error.message;
  }
};

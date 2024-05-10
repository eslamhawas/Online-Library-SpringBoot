import {deleteBorrowedBook} from "../services/borrowedBooksService";


export const deleteBorrowedBookFunc = (orderId) => deleteBorrowedBook(orderId)
  .then(() => {

  })
  .catch((error) => {
    console.error(error); // Log any errors
  });

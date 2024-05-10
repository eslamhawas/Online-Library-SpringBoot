import {getBookById, getBooks} from "../services/booksServices";
// GET ALL
export  let allBooks = []

getBooks()
  .then((response) => {
    allBooks = response
  })
  .catch((error) => {
    console.error(error); // Log any errors
  });



  // GET BY ID
export  let BookById = "book"

getBookById()
  .then((response) => {
    BookById = response
  })
  .catch((error) => {
    console.error(error); // Log any errors
  });


  // DELETE ONE
// export  let afterRemoveBook = "book"

// deleteBook("mariem")
//   .then((response) => {
//     afterRemoveBook = "Book Removed Successfully ."
//   })
//   .catch((error) => {
//     console.error(error); // Log any errors
//   });



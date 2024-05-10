import axios from "axios";

export const getBooks = async () => {
  try {
    let users = await axios.get("http://localhost:8082/api/v1/Book", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return users.data;
  } catch (error) {
    return error.message;
  }
};

export const getBookById = async (isbn) => {
  try {
    let users = await axios.get(`/${isbn}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return users.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteBook = async (isbn) => {
  try {
    let users = await axios.delete(`/Book/${isbn}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return users.data;
  } catch (error) {
    return error.message;
  }
};

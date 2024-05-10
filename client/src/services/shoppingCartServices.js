import axios from "axios";

export const getShoppingCart = async (userId) => {
  try {
    let users = await axios.get(
      `http://localhost:8083/api/v1/borrowedBooks/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return users.data;
  } catch (error) {
    return error.message;
  }
};

import axios from "axios";

export const getUsers = async () => {
  try {
    let users = await axios.get("/Users", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return users.data;
  } catch (error) {
    return error.message;
  }
};

export const getUserById = async (id) => {
  try {
    let user = await axios.get(`/Users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return user.data;
  } catch (error) {
    return error.message;
  }
};

export const addNewUser = async () => {
  try {
    let user = await axios.post(
      `/Register`,
      // {
      //    "ta7" ,
      //    "2024-04-16T00:00:00" ,
      //    "ta7@facebook.com" ,
      //    true ,
      //   // "isAccepted" : false ,
      //    "123457" ,
      //    "123457"
      // },
      {
        // to be in json format
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return user.data;
  } catch (error) {
    return error.message;
  }
};

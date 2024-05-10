import {addNewUser, getUserById, getUsers} from "../services/userServices";


// GET ALL
export let allUsers = []

 getUsers()
  .then((response) => {
    allUsers = response
  })
  .catch((error) => {
    console.error(error); // Log any errors
  });


  // GET BY ID
export let userById = ""


// NOTE : this value is string , not integer
const userId = localStorage.getItem('userId');

 getUserById(userId)
  .then((response) => {
    // console.log(response);
    userById = response
  })
  .catch((error) => {
    console.error(error); // Log any errors
  });

  
// POST ONE
export let registeredData = ""


 addNewUser()
  .then((response) => {
    // console.log(response);
    registeredData = response
  })
  .catch((error) => {
    console.error(error); // Log any errors
  });







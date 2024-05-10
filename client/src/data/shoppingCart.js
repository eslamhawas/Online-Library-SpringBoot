import {getShoppingCart} from "../services/shoppingCartServices";

export let shoppingCart = [];

// NOTE : this value is string , not integer
let userId = localStorage.getItem("userId");

export const getShoppingCartFunc = async () => {
  // regenerate , handle usecase of logout abd login with another account
  userId = localStorage.getItem("userId") || 1;
  // console.log("getShoppingCartFunc");
  await getShoppingCart(userId)
    .then((response) => {
      shoppingCart = response;
      console.log(shoppingCart);
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    })
    .catch((error) => {
      console.error(error); // Log any errors
    });
};

// const fetchShoppingCartData = async () => {
//   try {
//     const response = await getShoppingCart(user.id);
//     setCartItems(response);
//     localStorage.setItem("shoppingCart", JSON.stringify(response));
//   } catch (error) {
//     console.error("Error fetching shopping cart data:", error);
//   }
// };

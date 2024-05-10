import React, {useEffect, useState} from "react";
import {getShoppingCartFunc, shoppingCart} from "../../data/shoppingCart";
import {deleteBorrowedBookFunc} from "../../data/borrowedBooksData";
// import { UserContext } from "../../context/userContext";

const ShoppingCart = () => {
  // const { user } = useContext(UserContext);

  const [cartItems, setCartItems] = useState([]);
  let userId = localStorage.getItem("userId");

  const removeFromCart = (index, orderNumber) => {
    // Remove the item from the cartItems
    const updatedCartItems = cartItems.filter((_, idx) => idx !== index);
    setCartItems(updatedCartItems);

    localStorage.setItem("shoppingCart", JSON.stringify(updatedCartItems));

    // Proceed to delete the item from the database
    deleteBorrowedBookFunc(orderNumber)
      .then(() => {
        getShoppingCartFunc();
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);

        setCartItems(cartItems);
        localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
      });
  };

  // useEffect(() => {
  //   userId && getShoppingCartFunc();
  //   setCartItems(shoppingCart);
  //   console.log("get all items when shopping cart component mounted");
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        console.log("suiii");
        await getShoppingCartFunc();
        setCartItems(shoppingCart);
      }
    };
    fetchData();
  }, [userId]);

  // useEffect(() => {
  //   setCartItems(shoppingCart)
  // }, [user.id])

  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Shopping Cart</h2>
      <ul className="list-group mb-4">
        {!cartItems ? (
          <div class="alert alert-primary" role="alert">
            Loading....
          </div>
        ) : cartItems && cartItems.length !== 0 && userId ? (
          cartItems.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.title} - ${item.price}
              <img
                src={`/assets/images/${item.title}.jpg`}
                width="100"
                alt="Product Img"
              />
              {item.isAccepted === "true" ? (
                <div className="d-flex">
                  <div class="alert alert-success" role="alert">
                    Approved
                  </div>
                  <div class="alert alert-info ms-5" role="alert">
                    Return Date : {item.dateOfReturn}
                  </div>
                </div>
              ) : item.isAccepted === "Pending" ? (
                <div class="alert alert-warning" role="alert">
                  Waiting...
                </div>
              ) : (
                <div class="alert alert-danger" role="alert">
                  Rejected!
                </div>
              )}
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(index, item.orderNumber)}
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <div class="alert alert-danger" role="alert">
            NOT CART ITEMS YET!
          </div>
        )}
      </ul>
      {/* Placeholder for adding more books */}
    </div>
  );
};

export default ShoppingCart;

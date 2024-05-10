import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import "./styles.css";
import {addBorrowedBook} from "../../services/borrowedBooksService";

function DetailsOfBook() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookDetails = location.state;

  // const { user } = useContext(UserContext);
  // console.log(user.id);

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const loggedInOrNot = () => {
    if (userId) {
      navigate(`/shoppingCart/${userId}`);
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (book) => {
    await addBorrowedBook(book, userId);
    setUserId(localStorage.getItem("userId"));
    loggedInOrNot();
  };

  // useEffect(() => {
  //   setUserId(localStorage.getItem("userId"));
  // });

  return (
    <div className=" d-flex justify-content-center align-items-center m-3">
      <div className="card p-3">
        <div className="d-flex justify-content-between align-items-center ">
          <div className="m-2">
            <h4 className=" text-success">price : ${bookDetails.price}</h4>
            <div className="m-5">
              category of :{" "}
              <h5 className="text-uppercase  text-info">
                {bookDetails.category}
              </h5>
              <h1 className="main-heading  mt-5">{bookDetails.title}</h1>
              {
                // <div className="d-flex flex-row user-ratings">
                //   <div className="ratings">
                //     <i className="fa fa-star"></i>
                //     <i className="fa fa-star"></i>
                //     <i className="fa fa-star"></i>
                //     <i className="fa fa-star"></i>
                //   </div>
                //   <h6 className="text-muted ml-1">4/5</h6>
                // </div>
              }
            </div>
          </div>
          <div className="image ">
            <img
              src={`/assets/images/${bookDetails.title}.jpg`}
              width="100"
              alt="Product Img"
            />
          </div>
        </div>

        <p className="text-secondary">{bookDetails.description}</p>

        <button
          className="btn btn-danger"
          onClick={() => handleSubmit(bookDetails)}
        >
          BORROW
        </button>
      </div>
    </div>
  );
}

export default DetailsOfBook;

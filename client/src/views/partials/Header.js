import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../context/userContext";


function Header() {
  // NOTE : this value is string , not integer
  // const userId = localStorage.getItem("userId");
  const { user , updateUser } = useContext(UserContext);

  const [userId,setUserId] = useState(null)


  const navigate = useNavigate()
  const logout  = () => {
    localStorage.removeItem("userId" )
    localStorage.removeItem("shoppingCart")
    localStorage.removeItem("token")
    updateUser()
    // console.log(user.id);
    navigate("/")
  }
  useEffect(() => {
    setUserId(localStorage.getItem("userId"))
    console.log(userId);
  },[localStorage.getItem("userId")])

  return (
    <div class="px-3 py-2 text-bg-dark border-bottom">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to={"/"}
            class=" my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
          >
            <img
              className="rounded-pill d-flex align-items-center"
              src={process.env.PUBLIC_URL + "/assets/images/others/Logo.jpeg"}
              alt="LOGO"
              width="100"
            />
          </Link>

          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li className="nav-link text-secondary">
              <Link to={"/"} class="nav-link text-secondary">
                Home
              </Link>
            </li>
            <li className="nav-link text-secondary">
              <Link
                to={`/shoppingCart/${userId}`}
                class="nav-link text-secondary"
              >
                Shopping Cart
              </Link>
            </li>

            {!localStorage.getItem("userId") ? (
              <li className="btn btn-primary ">
                <Link to={"/login"} class="nav-link text-white">
                  Login
                </Link>
              </li>
            ) : (
              <li className="btn btn-danger">
                <button onClick={logout} class="nav-link text-white">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;

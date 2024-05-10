import React, {useEffect, useState} from "react";
import HomeCard from "./components/homeCard";
import {allBooks} from "../../data/booksData";
// import { UserContext } from "../../context/userContext";
// import { allUsers } from "../../data/usersData";

const Home = () => {
  // useEffect(() => {
  //   console.log(allUsers);
  //   console.log(allBooks);
  // }, [allUsers, allBooks]);

  const [cards, setCards] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    setCards(allBooks)
    let filteredBooks =
      allBooks.filter(
        (book) => book["category"].toLowerCase() === searchValue
      ) || cards;
    filteredBooks.length > 0 ? setCards(filteredBooks) : setCards(allBooks);
  }, [cards, searchValue]);


  return (
    <div className="container ">
      <form className="d-flex ms-auto" role="search">
        <input
          className="form-control me-2 text-center"
          type="search"
          placeholder="Search with Category..."
          value={searchValue}
          onChange={handleInputChange}
        />
      </form>
      {!cards ? (
        <div class="alert alert-primary" role="alert">
          Loading....
        </div>
      ) : (
        <div className=" row d-flex align-items-center justify-content-center">
          {cards.map((card, i) => {
            return <HomeCard key={i} card={card} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;

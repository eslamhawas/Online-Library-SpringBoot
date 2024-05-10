import React from "react";
import {Link} from "react-router-dom";

function HomeCard(props) {
  let card = props.card;

  return (
    <section className="card m-3 col-3">
      <div className="text-center">
        <Link to={`/book/${card.isbn}`} state={card}>
          <img
            src={`assets/images/${card.title}.jpg`}
            style={{ width: 200 }}
            className="card-img-top"
            alt="Book"
          />
        </Link>
      </div>
      <div className="card-body">
        <h3 className="text-dark">{card.title}</h3>
        <h5 className="text-info">Category : {card.category}</h5>
        <p className="card-text text-secondary">{card.rackNumber}</p>
      </div>
    </section>
  );
}

export default HomeCard;

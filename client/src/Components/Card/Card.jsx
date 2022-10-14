import React from "react";
import s from "./card.module.css";
import { Link } from "react-router-dom";
function Card({ id, name, image, genres, Genres, rating, platforms }) {

  return (
    <Link to={`/detail/${id}`}style={{ textDecoration: 'none' }}>
      <div className={s.card} style={{ backgroundImage: `url(${image})` }}>
        <h3>{name}</h3>
        <div className={s.cardcontent}>
          <div className={s.cardflex}>
            {(Genres || genres)?.map((genre, i) => (
              <p key={i}>{genre}</p>
            ))}
          </div>
          <p>{rating}</p>
          <div className={s.cardflex}>
            {platforms?.map((platform, i) => (
              <p key={i}>{platform}</p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;

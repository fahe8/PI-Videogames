import React from "react";
import s from "./card.module.css";
import { Link } from "react-router-dom"
function Card({ id, name, image, genres, rating, platforms }) {
  return (
    <Link to={`/detail/${id}`}>
      <div className={s.card} style={{ backgroundImage: `url(${image})` }}>
      <div className={s.text}>
        <h3>{name}</h3>
        <div>
          {genres?.map((genre, i) => (
            <p key={i}>{genre}</p>
          ))}
        </div>
      </div>
    </div>
    </Link>
  );
}

export default Card;

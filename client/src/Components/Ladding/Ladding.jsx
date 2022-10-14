import React from "react";
import s from "./ladding.module.css";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllGames, getPlatforms, getGenres } from "../../Redux/actions";

function Ladding() {
  let dispatch = useDispatch();
  let allgames = useSelector(state => state.videoGames)
  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getPlatforms());
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className={s.container}>
      {allgames.length?<div className={s["slideshow-image"]}>
        <div className={s.content}>
          <h1>VIDEOJUEGOS</h1>
          <h2>Ingresa y busca tus favoritos</h2>
        </div>
        <Link to="/home">
          <button className={s.btn}>INGRESAR</button>
        </Link>
      </div>:<Loading></Loading>}
    </div>
  );
}

export default Ladding;

import React, { useEffect } from "react";
import { getAllGames } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import s from "./cards.module.css";
function Cards() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
  }, []);


  let allGames = useSelector((state) => state.videoGames);
  let page = useSelector((state) => state.page);
  let gamesPerPage = useSelector((state) => state.gamesPerPage);
  let pageMax = Math.ceil(allGames.length / gamesPerPage)
  
  return (
    <div>
      <Pagination page = {page} gamesPerPage = {gamesPerPage} pageMax = {pageMax}></Pagination>
      <div className={s.containerCards}>
        {allGames
          ?.slice(
            (page - 1) * gamesPerPage,
            (page - 1) * gamesPerPage + gamesPerPage
          )
          .map((game, i) => (
            <Card key={i}
            genres={game.genres?.map(genre => typeof genre === 'object'? genre.name: genre )}
            id={game.id}
            image={game.image}
            name={game.name}
            rating={game.rating}
            plataforms={game.plataforms}
            ></Card>
          ))}
      </div>
    </div>
  );
}

export default Cards;

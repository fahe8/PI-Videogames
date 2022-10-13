import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Loading from '../Loading/Loading'
import NotFound from "../NotFound/NotFound";
import Filters from "../Card/Filters/Filters";
import s from "./cards.module.css";
import f  from '../Loading/loading.module.css'
import { useEffect } from "react";
import { getAllGames, getPlatforms, getGenres } from "../../Redux/actions";
function Cards() {
  let allGames = useSelector((state) => state.videoGames);
  let page = useSelector((state) => state.page);
  let gamesPerPage = useSelector((state) => state.gamesPerPage);
  let pageMax = Math.ceil(allGames.length / gamesPerPage)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllGames())
    dispatch(getPlatforms())
    dispatch(getGenres())
  },[dispatch]);
  
  if(allGames === 'No se encontró algo') {
    return <NotFound></NotFound>
  }

  return (
    <>

      {allGames.length?  <div className={f.container}>
        <Filters></Filters>
        <Pagination page = {page} pageMax = {pageMax}></Pagination> 
        <div className={s.containerCards}> 
        {
          allGames?.slice(
            (page - 1) * gamesPerPage,
            (page - 1) * gamesPerPage + gamesPerPage
          )
          .map((game, i) => (
            
            <Card key={i}
            genres={game.genres?.map(genre =>  typeof genre === 'object'? genre.name: genre )}
            id={game.id}
            image={game.image}
            name={game.name}
            rating={game.rating}
            plataforms={game.plataforms}
            ></Card>
            
          ))} </div>
      </div>
        : <Loading></Loading>}

    </>
  );
}

export default Cards;

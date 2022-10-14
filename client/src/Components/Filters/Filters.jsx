import {React, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBy, filterGenre } from "../../Redux/actions";
import s from "./filters.module.css";
function Filters() {
  let dispatch = useDispatch();
  let genres = useSelector(state => state.genres)
  const [active, setActive] = useState(false);
  const [checked, setChecked] = useState([]);
  const handleToggle = () => {
    setActive(!active)
  }

  const handleToggleGenres = (value) => {
    const newChecked = [...checked];
    const currentIndex = checked.indexOf(value);
    if(currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex,1)
    }
    setChecked(newChecked)

  }
  return (
    <div className={s.container}>
      <div className={active === true?`${s['containerFilters']} ${s['active']}` : s['containerFilters']}>
        <div className={s['label']} onClick={handleToggle}>Filter by Genre <span>{'>'}</span></div>
        <div className={s.content}>
          {genres?.map((genre,i) => <label key={i} ><input onChange={() => handleToggleGenres(genre.name)} type="checkbox" value={genre.name} />{genre.name}</label> ) }
          <button onClick={() => dispatch(filterGenre(checked))}>Filter </button>
        </div>
      </div>
      <select
        name="orderBy"
        id="orderBy"
        onChange={(e) => {
          dispatch(orderBy(e.target.value));
        }}
      >
        <option value="" hidden>
          Order By
        </option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="desc">Highest Ranking</option>
        <option value="asc">Lower Rating</option>
      </select>

      
    </div>
  );
}

export default Filters;

import {React, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "../../../Redux/actions";
import s from "./filters.module.css";
function Filters() {
  let dispatch = useDispatch();
  let genres = useSelector(state => state.genres)
  const [active, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!active)
  }
  return (
    <div className={s.container}>
      <select
        name=""
        id=""
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

      <div className={active === true?`${s['containerFilters']} ${s['active']}` : s['containerFilters']}>
        <div className={s['label']} onClick={handleToggle}>Filter by Genre <span>{'>'}</span></div>
        <div className={s.content}>
          {genres?.map((genre,i) => <label key={i}><input type="checkbox" name="" id="" />{genre.name}</label> )}
         
        </div>
      </div>
    </div>
  );
}

export default Filters;

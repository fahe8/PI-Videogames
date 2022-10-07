import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { nextPage, prevPage, currentPage } from "../../Redux/actions";
import s from "./pagination.module.css";

function Pagination({ page, pageMax }) {
    console.log(pageMax);
  let [valueInput, setValueInput] =  useState(1)

  let dispatch = useDispatch();
  const next = () => {
    setValueInput(parseInt(valueInput)+1)
    parseInt(dispatch(nextPage()));
  };
  const prev = () => {
    setValueInput(parseInt(valueInput)-1)
    parseInt(dispatch(prevPage()));
  };

  const onKeyDown = (e) => {
    e.preventDefault()

    dispatch(currentPage(valueInput));
    if (
    parseInt(valueInput) < 1 ||
    parseInt(valueInput) > pageMax ||
    isNaN(parseInt(valueInput))
    ) {
    setValueInput(1)
    dispatch(currentPage(1));
    } else {
    dispatch(currentPage( parseInt(valueInput)));
    }
    
  };

  const onChange = (e) => {
    setValueInput(e.target.value)
  };

  return (
    <div className={s.containerPagination}>
      <button onClick={prev} disabled={page === 1 || page < 1}>izq</button>
      <form action="" onSubmit={(e) => {onKeyDown(e)}}>
      <input
        onChange={e => onChange(e)}
        value={valueInput}
      />
      </form>
      
      <p>de {pageMax}</p>
      <button onClick={next} disabled={page === pageMax || page > pageMax}>der</button>
    </div>
  );
}

export default Pagination;

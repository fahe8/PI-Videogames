import React from 'react'
import s from './card.module.css'

function Card({id,name,image,genres,rating,platforms}) {
  return (

    <div className={s.card} >
      <h3>{name}</h3>
      <div>{genres?.map((genre, i) => <p key={i}>{genre}</p>)}</div>
      
    </div>
  )
}

export default Card
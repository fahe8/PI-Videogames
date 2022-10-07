import React from 'react'
import s from './ladding.module.css'
import { Link } from 'react-router-dom'

function Ladding() {
  return (
    <div className={s.container}> 
      <div className={s['slideshow-image']}>
        <div className={s.content}>
          <h1 >VIDEOJUEGOS</h1>
          <h2 >Ingresa y busca tus favoritos</h2>
        </div>
          <Link to= '/home'><button className={s.btn}>INGRESAR</button></Link>
      </div>
    </div>
  )
}

export default Ladding
import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'
import s from './header.module.css'

function Header() {
  return (
    <div className={s.container}>
      <h1> VIDEOGAMES</h1>
      <Search></Search>
      <Link to= {'/create'}><button>Insert Game</button></Link>

    </div>
  )
}

export default Header
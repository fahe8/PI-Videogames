import React from 'react'
import Search from '../Search/Search'
import Cards from '../Cards/Cards'
import Header from '../Header/Header'
import l from '../Ladding/ladding.module.css'
import s from './home.module.css'
function Home() {
  return (
    <div>
      <Header></Header>
      <Search></Search>
      <Cards></Cards>
    </div>
  )
}

export default Home
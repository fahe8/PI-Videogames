import React from 'react'

import Cards from '../Cards/Cards'
import Header from '../Header/Header'
import l from '../Ladding/ladding.module.css'
import s from './home.module.css'
import Loading from '../Loading/Loading'
function Home() {

  return (
    <div className={s.container}>
      <Header></Header>
      <Cards></Cards>
    </div>
  )
}

export default Home
import React from 'react'

import Cards from '../Cards/Cards'
import Header from '../Header/Header'
import l from '../Ladding/ladding.module.css'
import s from './home.module.css'
import { useSelector } from 'react-redux'
import Loading from '../Loading/Loading'
function Home() {
  const loading =  useSelector(state => state.loading)
  const games = useSelector(state => state.allGames)

  // if(loading) {
  //   return <Loading></Loading>
  // }
  return (
    <div className={s.container}>
      <Header></Header>
      <Cards></Cards>
    </div>
  )
}

export default Home
import {React, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDetailGame } from '../../Redux/actions'
import Loading from '../Loading/Loading'
import s from './detail.module.css'

function Detail() {
  let videoGamesDetail = useSelector(state => state.videoGamesDetail)
  let loading = useSelector(state => state.loading)
  let dispatch = useDispatch()
  let {id} = useParams()
  useEffect(() => {
    dispatch(getDetailGame(id))
    
  }, [dispatch,id]);


  return (
    <div>
      {loading? <Loading></Loading>: <>
      <h1>{videoGamesDetail.name}</h1>
        <div className={s.image} style={{ backgroundImage: `url(${videoGamesDetail.image})` }}></div>
        {<p dangerouslySetInnerHTML={{__html: videoGamesDetail.description}}></p>}</>}
      
    </div>

  )
}

export default Detail
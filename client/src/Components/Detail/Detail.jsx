import {React, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDetailGame } from '../../Redux/actions'
import s from './detail.module.css'

function Detail() {
  let videoGamesDetail = useSelector(state => state.videoGamesDetail)
  let dispatch = useDispatch()
  let {id} = useParams()
  console.log(videoGamesDetail);
  useEffect(() => {
    dispatch(getDetailGame(id))
    
  }, [dispatch,id]);
  return (
    <div>
      <h1>{videoGamesDetail.name}</h1>
      <div className={s.image} style={{ backgroundImage: `url(${videoGamesDetail.image})` }}></div>
      {<p dangerouslySetInnerHTML={{__html: videoGamesDetail.description}}></p>}
    </div>

  )
}

export default Detail
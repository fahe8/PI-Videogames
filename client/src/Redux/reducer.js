import {GET_VIDEOGAMES,NEXT_PAGE, PREV_PAGE, CURRENT_PAGE} from './actions'

const initialState = {
    videoGames: [],
    VideoGamesDetail: {},
    Genres: [],
    page: 1,
    gamesPerPage: 15,
  };

const rootReducer = (state = initialState, action ) => {
    switch (action.type) {
        case GET_VIDEOGAMES : 
        return {
            ...state,
            videoGames: action.payload
        }

        case NEXT_PAGE :
        return{
            ...state,
            page: state.page + 1
        }
        case PREV_PAGE :
        return{
            ...state,
            page: state.page - 1
        }
        case  CURRENT_PAGE :
        return {
            ...state,
            page: action.payload
        }
    
        default:
        return {...state}
    }
}

export default rootReducer
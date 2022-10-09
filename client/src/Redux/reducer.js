import {GET_VIDEOGAMES,NEXT_PAGE, PREV_PAGE, CURRENT_PAGE, LOADING} from './actions'

const initialState = {
    videoGames: [],
    VideoGamesDetail: {},
    Genres: [],
    page: 1,
    gamesPerPage: 15,
    loading: false
  };

const rootReducer = (state = initialState, action ) => {
    switch (action.type) {
        case GET_VIDEOGAMES : 
            return {
                ...state,
                loading: false,
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
        case LOADING :
            return {
                ...state,
                loading: true
            }
    
        default:
        return {...state}
    }
}

export default rootReducer
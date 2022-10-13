import {
  GET_VIDEOGAMES,
  NEXT_PAGE,
  PREV_PAGE,
  CURRENT_PAGE,
  LOADING,
  GET_DETAIL,
  GET_PLATFORMS,
  GET_GENRES,
  ORDER_BY,
} from "./actions";

const initialState = {
  videoGames: [],
  videoGamesDetail: {},
  genres: [],
  platforms: [],
  page: 1,
  gamesPerPage: 15,
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,

        videoGames: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        loading: false,
        videoGamesDetail: action.payload,
      };

    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case PREV_PAGE:
      return {
        ...state,
        page: state.page - 1,
      };
    case CURRENT_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case ORDER_BY:
      let copy = [...state.videoGames];
      switch (action.payload) {
        case "A-Z":
          return {
            ...state,
            videoGames: copy.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            ),
          };
        case "Z-A":
          return {
            ...state,
            videoGames: copy.sort((a, b) =>
              b.name.toLowerCase().localeCompare(a.name.toLowerCase())
            ),
          };

        case "desc":
          return {
            ...state,
            videoGames: copy.sort((a, b) => b.rating - a.rating),
          };
        case "asc":
          return {
            ...state,
            videoGames: copy.sort((a, b) => a.rating - b.rating),
          };

        default:
      }

    default:
      return { ...state };
  }
};

export default rootReducer;

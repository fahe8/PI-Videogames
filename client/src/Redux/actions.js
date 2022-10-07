import axios from "axios";


export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const NEXT_PAGE = 'NEXT_PAGE'
export const PREV_PAGE = 'PREV_PAGE'
export const CURRENT_PAGE = "CURRENT_PAGE"

export const getAllGames = (game) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/videogames${game ? `name=${game}` : ""}`
      );
      return dispatch({ type: "GET_VIDEOGAMES", payload: data || {} });
    } catch (error) {
      
      console.error(error);
      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: {},
      });
    }
  };
};

export const nextPage = () => {
  return {type: "NEXT_PAGE"}
}
export const prevPage = () => {
  return {type: "PREV_PAGE"}
}
export const currentPage = (page) => {
  return {type: "CURRENT_PAGE", payload: page}
  
}

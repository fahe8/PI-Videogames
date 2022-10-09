import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const CURRENT_PAGE = "CURRENT_PAGE";
export const LOADING = "LOADING";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME"

export const getAllGames = (game) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const { data } = await axios.get(
        `http://localhost:3001/videogames${game ? `?name=${game}` : ""}`
      );
      return dispatch({ type: "GET_VIDEOGAMES", payload: data || [] });
    } catch (error) {
      console.log(error.response.data);
      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: [],
      });
    }
  };
};

export const createGame = (game) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('http://localhost:3001/videogames', game)
      return dispatch({ type: "CREATE_VIDEOGAME", payload: data})
    } catch (error) {
      console.log(error.response.data);
    }
  }
}

export const getDetailGame = () => {};

export const nextPage = () => {
  return { type: "NEXT_PAGE" };
};
export const prevPage = () => {
  return { type: "PREV_PAGE" };
};
export const currentPage = (page) => {
  return { type: "CURRENT_PAGE", payload: page };
};

export const loading = () => {
  return { type: "LOADING" };
};

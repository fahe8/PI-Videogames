import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const CURRENT_PAGE = "CURRENT_PAGE";
export const LOADING = "LOADING";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_DETAIL = "GET_DETAIL";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_GENRES = "GET_GENRES";
export const ORDER_BY = "ORDER_BY";
export const FILTERGENRE = "FILTERGENRE"

export const getAllGames = (game) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/videogames${game ? `?name=${game}` : ""}`
      );
      return dispatch({ type: "GET_VIDEOGAMES", payload: data || [] });
    } catch (error) {
      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: error.response.data,
      });
    }
  };
};

export const createGame = (game) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/videogames",
        game
      );
      return dispatch({ type: "CREATE_VIDEOGAME", payload: data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getDetailGame = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const { data } = await axios.get(
        "http://localhost:3001/videogames/" + id
      );
      return dispatch({ type: "GET_DETAIL", payload: data });
    } catch (error) {}
  };
};

export const getPlatforms = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/platforms");
      return dispatch({ type: "GET_PLATFORMS", payload: data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/genres");
      return dispatch({ type: "GET_GENRES", payload: data });
    } catch (error) {}
  };
};
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

export const orderBy = (order) => {
  return { type: "ORDER_BY", payload: order };
};

export const filterGenre = (filter) => {

  return {type: "FILTERGENRE", payload: filter}
}

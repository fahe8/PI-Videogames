require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

// Retorna los videojuegos que contiene la database
const getGamesDb = async () => {
  const videoGames = await Videogame.findAll({
    includes: {
      model: Genre,
      attributes: ["name"],
      throught: {
        attributes: [],
      },
    },
  });
  return videoGames;
};

//Retorna 100 videojuegos desde la Api
const getGamesApi = async () => {
  const videoGamesPromises = [];
  const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=`;

  for (let i = 1; i < 6; i++) {
    const games = axios.get(`${url}${i}`);
    videoGamesPromises.push(games);
  }

  const resPromises = await Promise.all(videoGamesPromises);
  const videoGames = [];
  resPromises.map((game) => {
    if (game.status != 200) {
      throw new Error("Hay problemas con la Api");
    }
    videoGames.push(...game.data.results);
  });

  const gamesResume = [];
  videoGames.forEach((g) => {
    gamesResume.push({
      id: g.id,
      name: g.name,
      description: !g.description ? "No hay descricion" : g.description,
      released: g.released,
      rating: g.rating,
      platforms: g.platforms.map((p) => p.platform.name),
      image: g.background_image,
      genres: g.genres.map((g) => g.name),
    });
  });

  return gamesResume;
};
// Retorna los 100 videojuegos extraidos de la api y los de la database
const getAllGames = async () => {
  const gameDb = await getGamesDb();
  const gameApi = await getGamesApi();
  return [...gameDb, ...gameApi];
};


/**
 * TODO: Debo verificar que sucede cuando la query(game) es vacio
 * @param {*} game 
 * @returns 
 */

const getGameQuery = async (game) => {
  console.log(game)
  if (!game) {
    throw new Error("No se recibió algo por query");
  }
  if(game.length == 0) {throw new Error("La query está vacia")} //MODIFICAR
  
  const url = ` https://api.rawg.io/api/games?key=${API_KEY}&search=${game}`;
  const promiseRes = await axios.get(url);
  const result = promiseRes.data.results.slice(0, 15);
  if (result.length) {
    return result;
  } else {
    throw new Error(
      `La busqueda no ha encontrado algo relacionado con ${game} `
    );
  }
  

  
};

module.exports = { getAllGames, getGameQuery };

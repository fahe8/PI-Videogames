require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre, Op } = require("../db");

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


const getGameQuery = async (game) => {
  const url = ` https://api.rawg.io/api/games?key=${API_KEY}&search=${game}`;
  const promiseRes = await axios.get(url);
  const result = promiseRes.data.results.slice(0, 15);
  
  if (!result.length) {
    throw new Error(
      `La busqueda no ha encontrado algo relacionado con ${game} `
    );
  } 
  const fifteenGames = result.map((g) => {
    return {
      id: g.id,
      name: g.name,
      released: g.released,
      rating: g.rating,
      platforms: g.platforms.map((p) => p.platform.name),
      image: g.background_image,
      genres: g.genres.map((g) => g.name),
    };
  });

  const gameDb = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike] : `%${game}%`
      }
    },
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  })
  return [...gameDb, ...fifteenGames].slice(0,15);
};

const getGameApiId = async (id) => {
  const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
  const promiseRes = await axios.get(url);
  const fullData =  promiseRes.data 
  const resumeInfo = {
    id: fullData.id,
    name: fullData.name,
    description: !fullData.description ? "No hay descricion" : fullData.description,
    released: fullData.released,
    rating: fullData.rating,
    platforms: fullData.platforms.map((p) => p.platform.name),
    image: fullData.background_image,
    genres: fullData.genres.map((g) => g.name),
  }
  return resumeInfo
};

const getGameDbId = async (id) => {
  const gameId = await Videogame.findByPk(id, {
    includes: {
      model: Genre,
      attributes: ["name"],
      throught:{
        attributes: []
      }
    }
  })
  if(gameId==null) {
    throw new Error('No se encontró en la database')
  }
  return gameId
}

const getGameId = async (id) => {
  if(id.includes('db')) {
    return await getGameDbId(id)
  } else {
    return await getGameApiId(id)
  }


}

module.exports = { getAllGames, getGameQuery, getGameId };

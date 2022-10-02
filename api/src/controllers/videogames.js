require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");
const { Op } = require('sequelize'); 

// Retorna los videojuegos que contiene la database
const getGamesDb = async () => {
  const videoGames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
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

// Encuentra y retorna 15 juegos por query desde la Api y Databse
const getGameQuery = async (game) => {
  const url = ` https://api.rawg.io/api/games?key=${API_KEY}&search=${game}`;
  const promiseRes = await axios.get(url);
  const result = promiseRes.data.results.slice(0, 15);
  
  // if (!result.length) {
  //   throw new Error(
  //     `La busqueda no ha encontrado algo relacionado con ${game} `
  //   );
  // } 
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
      name: {[Op.iLike]: `%${game}%`},

    },
    include: {
      model: Genre,
      attributes: ["name"]
    }
  })
  
  return total = [...gameDb,...fifteenGames];
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
  console.log(id)
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
  if(id.includes('-')) {
    return await getGameDbId(id)
  } else {
    return await getGameApiId(id)
  }
}

const createGames = async (game) => {

  const { name, description,released, image,rating,platforms,genres } = game
  if(name && description && platforms.length > 0) {
    const [videoGame, created] = await Videogame.findOrCreate({
      where: { name: name },
      defaults: {
        description : description,
        released: released || null,
        image: image || null,
        rating: rating || null,
        platforms: platforms
      }
    });

    if(created) {
      const relacion = await Genre.findAll({
        where: {
          name: genres
        }
      })
      videoGame.addGenre(relacion)
      return  'Se creó exitosamente'
    }
    return  Error('Ya existe un juego con estos datos')
    
    
  } else {throw new Error('Los datos obligatorios estan vacios')}
 
}


module.exports = { getAllGames, getGameQuery, getGameId, createGames };

require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre, Op } = require("../db");

const getGenres = async () => {
    const ApiGenre = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    ApiGenre.data.results.map(async g => {
        await Genre.findOrCreate({
            where: {
                name: g.name
            },
        })  
    })

    const allGenres = await Genre.findAll({attributes: ["name"]})
    if(!allGenres.length){ throw new Error('No hay generos')}
    return allGenres

    
    
}

module.exports= {getGenres}
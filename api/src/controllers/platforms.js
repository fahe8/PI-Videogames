const { getGamesApi } = require('./videogames')

const getPlatform = async () => {
    const allGames = await getGamesApi();
    let platforms = [];

    allGames.map((game) => {
        game.platforms.map((p) => {
            if (!platforms.includes(p)) {
              platforms.push(p);
            }
          })
    }
     
    );
    if(!platforms.length) throw new Error('No hay plataformas')
    return platforms


  };


  module.exports  = { getPlatform }
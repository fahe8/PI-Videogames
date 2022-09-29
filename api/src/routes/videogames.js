const { Router } = require('express')
const {getAllGames, getGameQuery, getGameId} = require('../controllers/videogames')
const router = Router()
const axios = require('axios')


 router.get('/', async  (req,res) => {
    try {
        if(req.query.name) {
            const searchGames = await getGameQuery(req.query.name)
            res.send(searchGames)
        } else {
            const game = await getAllGames()
            res.status(200).send(game)

        }

    } catch (error) {
        res.send(error.mesagge)
    }

})
router.get('/:idVideogame', async(req,res) => {
    try {
        const {idVideogame} = req.params
        const gameParam = await getGameId(idVideogame);
        res.send(gameParam);
    } catch (error) {
        res.send(error.mesagge);
    }
})

module.exports = router
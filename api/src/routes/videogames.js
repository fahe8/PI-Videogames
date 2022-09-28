const { Router } = require('express')
const {getAllGames, getGameQuery} = require('../controllers/videogames')
const router = Router()
const axios = require('axios')


 router.get('/', async  (req,res) => {
    try {
        if(req.query.search) {
            const searchGames = await getGameQuery(req.query.search)
            res.send(searchGames)
        }
        const game = await getAllGames()
        res.status(200).send(game)

    } catch (error) {
        res.send(error.mesagge)
    }

})

module.exports = router
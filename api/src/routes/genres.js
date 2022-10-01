const { Router } = require('express')
const router = Router()
const { getGenres } = require('../controllers/genre')


router.get('/', async (req, res) => {
    res.send(await getGenres())
})



module.exports = router
const { Router } = require('express')
const router = Router()
const { getPlatform } = require('../controllers/platforms')

router.get('/', async (req,res) => {
    try {
        const platforms = await getPlatform()
        res.status(200).send(platforms)
    } catch (error) {
        res.status(404).send(error.message)
    }
})


module.exports = router
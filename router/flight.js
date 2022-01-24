const router = require('express').Router()
router.get('/', async (req, res) => {
    res.render('home')
})
router.get('/t', async (req, res) => {
    res.send(await flightService.save({name:'Hi'}))
})
module.exports = router
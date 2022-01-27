const router = require('express').Router()
const flightsServices = require('../services/flight')
//--------------------------------
router.get('/', async (req, res) => {
    try {
        const data = await flightsServices.get({})
        console.log(req.query)
        res.render('home', {data,filters:req.query})
    } catch (e) {
        log.error(e.stack)
        res.status(400).send(e.message)
    }
})
router.post('/test', async (req, res) => {
    try {
        console.log(req.body)
        res.send('OK')
    } catch (e) {
        log.error(e.stack)
        res.status(400).send(e.message)
    }
})
//--------------------------------
router.post('/flight', async (req, res) => {
    try {
        await flightsServices.save(req.body)
        res.send('OK')
    } catch (e) {
        log.error(e.stack)
        res.status(400).send(e.message)
    }
})
//--------------------------------
module.exports = router
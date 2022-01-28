const router = require('express').Router()
const flightsServices = require('../services/flight')
//--------------------------------
router.get('/', async (req, res) => {
    try {
        log.info('/ query: ', req.query)
        const query = []
        if (req.query.origin) {
            query.push({
                $match: {
                    origin: new RegExp(["^", req.query.origin, "$"].join(""), "i")
                }
            })
        }
        if (req.query.destination) {
            query.push({
                $match: {
                    destination: new RegExp(["^", req.query.destination, "$"].join(""), "i")
                }
            })
        }
        if (req.query.minPrice) {
            query.push({
                $match: {
                    price: {$gte: parseInt(req.query.minPrice)}
                }
            })
        }
        if (req.query.maxPrice) {
            query.push({
                $match: {
                    price: {$lte: parseInt(req.query.maxPrice)}
                }
            })
        }
        if (req.query.flightClass && req.query.flightClass !== 'All') {
            query.push({
                $match: {
                    flightType: new RegExp(["^", req.query.flightClass, "$"].join(""), "i")
                }
            })
        }
        if (req.query.company) {
            query.push({
                $match: {
                    company: new RegExp(["^", req.query.company, "$"].join(""), "i")
                }
            })
        }
        if (req.query.departureTime) {
            req.query.departureTime = new Date(req.query.departureTime)
            query.push({
                $match: {
                    departureDate: req.query.departureTime
                }
            })
        }
        const data = await flightsServices.aggregate(query)
        res.render('home', {data, filters: req.query})
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
        if (typeof parseInt(req.body.price) !== "number" || typeof parseInt(req.body.capacity) !== "number" || !(/\d\d\d\d-\d\d-\d\d/.test(req.body.departureDate))){
            res.status(400).send('Bad Input')
        }
        await flightsServices.save(req.body)
        res.status(201).send('OK')
    } catch (e) {
        log.error(e.stack)
        res.status(400).send(e.message)
    }
})
//--------------------------------
module.exports = router
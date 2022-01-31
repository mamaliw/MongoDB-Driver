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
        if (req.query.capacity) {
            query.push({
                $match: {
                    capacity: parseInt(req.query.capacity)
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
        if (req.query.page) {
            req.query.page = parseInt(req.query.page)
            if (req.query.mode === 'next')
                req.query.page++
            else if (req.query.mode === 'prev' && req.query.page>1)
                req.query.page--
            query.push({$skip: req.query.page*5-5})
            query.push({ $limit : 5})
        }
        const data = await flightsServices.aggregate(query)
        // console.log(data)
        res.render('home', {data, filters: req.query})
    } catch (e) {
        log.error(e.stack)
        res.status(400).send(e.message)
    }
})

router.get('/modal/:id', async (req, res) => {
    try {
        // console.log(req.params.id)
        // console.log(req.query)

        const id = req.params.id

        if (req.query.mode === 'remove'){
            await flightsServices.removeById(id)
            res.redirect('/')
        }else if (req.query.mode === 'edit'){
            await flightsServices.updateById(id,{$set:{capacity:parseInt(req.query.capacity)}})
            res.redirect('/')
        }
    } catch (e) {
        log.error(e.stack)
        res.status(400).send(e.message)
    }
})
router.get('/bulk', async (req, res) => {
    try {
        console.log(req.query)
        const {company, origin, destination, departureTime, capacity} = req.query

        await flightsServices.update({
            company,
            origin,
            destination,
            departureDate: new Date(departureTime+':00.000Z')
        },
            {
                $set:{capacity}
            })
        res.redirect('/')

    } catch (e) {
        log.error(e.stack)
        res.status(400).send(e.message)
    }
})
//--------------------------------
router.post('/flight', async (req, res) => {
    try {
        log.debug('POST /flight, data: ',req.body)
        if (typeof parseInt(req.body.price) !== "number" || typeof parseInt(req.body.capacity) !== "number" || !(/\d\d\d\d-\d\d-\d\d/.test(req.body.departureDate))){
            throw new Error('Bad Input')
        }
        req.body.price = req.body.price === 0 ? 'N/A' : req.body.price
        req.body.capacity = req.body.capacity === 0 ? 'N/A' : req.body.capacity
        await flightsServices.save(req.body)
        res.status(201).send('OK')
    } catch (e) {
        log.error(e.stack)
        res.status(400).send(e.message)
    }
})
//--------------------------------
module.exports = router
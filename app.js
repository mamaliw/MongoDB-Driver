(async () => {
        require('dotenv').config()
        require('./util/winston')
        const express = require('express')
        global.DB = await (new (require('./util/database'))).get()
        //-----------------------------
        const flightService = require('./services/flight')
        //-----------------------------
        const app = express()
        app.use(express.json())
        app.use(express.static('public'))
        app.use(express.urlencoded({extended: false}));
        app.use(require('./router/flight'))
        app.set('view engine', 'ejs');
        app.listen(parseInt(process.env.SERVER_PORT), () => log.info(`Express Server Is Listening On Port: ${process.env.SERVER_PORT}`))
        //--------------------
    }
)()

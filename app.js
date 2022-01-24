require('dotenv').config()
require('./util/winston')
const express = require('express')
const mongodb = require('mongodb')
const requset = require('request')


let main = async () => {
    const DB =await( new (require('./util/database'))).get()
    await DB.collection('test').insertOne({Text: 'HelloWorld'})

    log.debug('hi')
}
main()


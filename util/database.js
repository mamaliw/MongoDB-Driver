const {MongoClient} = require('mongodb')
const winston = require('winston')

module.exports = class DB {

    constructor() {
        this.url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
        this.name = process.env.DB_NAME
        this.client = new MongoClient(this.url);
    }

    async get(){
        await this.client.connect()
        return this.client.db(this.name);
    }

}
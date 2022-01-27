const {MongoClient} = require('mongodb')
const winston = require('winston')

module.exports = class DB {

    constructor() {
        if (process.env.DB_USERNAME && process.env.DB_PASSWORD)
            this.url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
        else
            this.url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
        this.name = process.env.DB_NAME
        this.client = new MongoClient(this.url);
    }

    async get() {
        await this.client.connect()
        return this.client.db(this.name);
    }

}
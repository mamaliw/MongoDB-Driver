const mongodb = require('mongodb')
const collection = DB.collection('flights')
module.exports = {

    async save(data){
        try {
            return await collection.insertOne(data)
        }catch (e) {
            log.error(e.status)
        }
    },
    async get(filter){
        try {
            return await collection.find(filter).toArray()
        }catch (e) {
            log.error(e.status)
        }
    },
    async update(filter,update){
        try {
            return await collection.updateOne(filter,update)
        }catch (e) {
            log.error(e.status)
        }
    },

}
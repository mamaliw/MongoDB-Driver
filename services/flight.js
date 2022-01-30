const {mongodb,ObjectId} = require('mongodb')
const collection = DB.collection('flights')
module.exports = {

    async save(data) {

        data.departureDate = new Date(data.departureDate)
        data.price = parseInt(data.price)
        data.capacity = parseInt(data.capacity)
        return await collection.insertOne(data)

    },
    async get(filter) {
        return await collection.find(filter).toArray()
    },
    async removeById(id) {
        return await collection.deleteOne({_id:ObjectId(id)})
    },
    async aggregate(query) {
        return await collection.aggregate(query).toArray()
    },
    async updateById(id, update) {
        return await collection.updateOne({_id:ObjectId(id)}, update)
    },

}
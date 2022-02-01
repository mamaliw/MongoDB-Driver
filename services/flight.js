const {mongodb,ObjectId} = require('mongodb')
const collection = DB.collection('flights')
module.exports = {

    async save(data) {

        // data.departureDate = new Date(data.departureDate)
        // console.log(momentt(data.departureDate+data['landing time'], "YYYY-MM-DD HH:MMA"))
        data.departureDate = momentt(`${data.departureDate} ${data['landing time']} +0000`, "YYYY-MM-DD hh:mmA Z").toDate()
        // data.price = parseInt(data.price)
        // data.capacity = parseInt(data.capacity)
        data.createdAt = new Date()
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
    async update(filter, update) {
        return await collection.updateMany(filter, update)
    },
    convertDate(date){
        return momentt(`${data.departureDate} ${data['landing time']} +0000`, "YYYY-MM-DD hh:mmA Z").toDate()
    },
    start(date){
        date.setUTCHours(0)
        date.setUTCMinutes(0)
        date.setUTCSeconds(0)
        return date
    },
    end(date){
        date.setUTCHours(23)
        date.setUTCMinutes(59)
        date.setUTCSeconds(59)
        return date
    },
    async delete(filter) {
        return await collection.deleteMany(filter)
    },

}
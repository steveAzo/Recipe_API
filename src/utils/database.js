const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const Mongo_Uri = process.env.MONGO_URI
console.log(Mongo_Uri)


const connectDB = async () => {
    try {
        await mongoose.connect(Mongo_Uri)
        console.log('MongoDB connected')
    } catch (err) {
        console.log('MongoDB connection error', err.message)
        process.exit(1)
    }
}

module.exports = connectDB
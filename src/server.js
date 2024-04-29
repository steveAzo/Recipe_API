const { ApolloServer } = require('apollo-server')
const dotenv = require('dotenv')
const db = require('./utils/database')
const { schema } = require('./schema')
dotenv.config()


db()


const PORT = process.env.PORT || 4000
console.log(PORT)


const server = new ApolloServer({
    schema
})


// start the server
server.listen(PORT).then(({ url }) => {
    console.log(`Server running at ${url}`)
})
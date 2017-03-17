var express = require('express')
var bodyParser = require('body-parser')
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
var { makeExecutableSchema } = require('graphql-tools')

var typeDefs = [`
type Query {
  hello: String
}

# Defines all available mutations.
type Mutation {
    # Greets you with a friendly message.
    greet(
      # Your name.
      name: String!
    ): String
}

schema {
  query: Query
  mutation: Mutation
}`]

var resolvers = {
  Query: {
    hello() {
      return 'world'
    }
  },
  Mutation: {
      greet: (_:any, { name } : { name: string}) => {
          return "Hello " + name
      }
  }
}
const logger = { log: (e : string) => console.log(e) }
var schema = makeExecutableSchema({typeDefs, resolvers, logger})
var app = express()
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'))
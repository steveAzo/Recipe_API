// userTypeDefs.js

const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    token: String!
    createdAt: String!
  }

  extend type Query {
    getUsers: [User!]!
    getUser(id: ID!): User!
  }

  extend type Mutation {
    register(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    updateUser(id: ID!, username: String, email: String, password: String): User!
    deleteUser(id: ID!): User!
  }
`;

module.exports = typeDefs;

// schema/recipe/typeDefs.js

const { gql } = require('apollo-server');

const typeDefs = gql`
  type Recipe {
    id: ID!
    title: String!
    description: String!
    ingredients: [String]!
    instructions: [String]!
    createdBy: User!
    createdAt: String!
  }

  type Query {
    getRecipes: [Recipe]!
    getRecipe(id: ID!): Recipe
  }

  type Mutation {
    createRecipe(
      title: String!
      description: String!
      ingredients: [String]!
      instructions: [String]!
      createdBy: ID!
    ): Recipe!
    updateRecipe(
      id: ID!
      title: String
      description: String
      ingredients: [String]
      instructions: [String]
    ): Recipe!
    deleteRecipe(id: ID!): Recipe!
  }
`;

module.exports = typeDefs;

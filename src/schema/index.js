const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const path = require('path');

const userTypeDefs = require('./user/typeDefs');
const recipeTypeDefs = require('./recipe/typeDefs');

const typeDefs = mergeTypeDefs([userTypeDefs, recipeTypeDefs]);

const userResolvers = require('./user/resolver');
const recipeResolvers = require('./recipe/resolvers');

const resolvers = mergeResolvers([userResolvers, recipeResolvers]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema };

const { makeExecutableSchema } = require('graphql-tools');
const ingredientTypeDefs = require('./typeDefs/ingredientTypeDefs');
const recipeTypeDefs = require('./typeDefs/recipeTypeDefs');
const ingredientResolvers = require('./resolvers/ingredientResolvers');
const recipeResolvers = require('./resolvers/recipeResolvers');

const schema = makeExecutableSchema({
  typeDefs: [ingredientTypeDefs, recipeTypeDefs],
  resolvers: [ingredientResolvers, recipeResolvers],
});

module.exports = schema;
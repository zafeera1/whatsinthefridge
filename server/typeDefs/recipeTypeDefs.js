const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    searchRecipesByIngredients(ingredients: [String]!): [Recipe]
  }

  type Recipe {
    id: Int!
    title: String
    image: String
  }
`;

module.exports = typeDefs;

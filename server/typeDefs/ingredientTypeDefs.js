const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    searchIngredients(query: String!): [Ingredient]
  }

  type Ingredient {
    id: Int!
    name: String
    image: String
  }
`;

module.exports = typeDefs;
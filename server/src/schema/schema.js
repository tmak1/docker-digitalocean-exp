import { gql } from 'apollo-server-express';
import superheroTypes from './typeDefs/superheroTypes.js';
import {
  getSuperheroes,
  getSuperhero,
  createSuperhero,
} from './resolvers/supeheroeResolvers.js';

export const typeDefs = gql`
  ${superheroTypes}

  type Query {
    superheroes: [Superhero]!
    superhero(id: ID!): Superhero!
  }
  type Mutation {
    createSuperhero(input: SuperheroInputs!): Superhero!
  }
`;

export const resolvers = {
  Query: {
    superheroes: getSuperheroes,
    superhero: getSuperhero,
  },
  Mutation: {
    createSuperhero,
  },
};

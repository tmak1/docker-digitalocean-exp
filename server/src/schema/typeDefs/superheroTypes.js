import { gql } from 'apollo-server-express';

const superheroTypes = gql`
  type Superhero {
    id: ID!
    name: String!
    alterEgo: String!
    sidekick: String!
    age: String!
  }

  input SuperheroInputs {
    name: String!
    alterEgo: String!
    sidekick: String!
    age: String!
  }
`;

export default superheroTypes;

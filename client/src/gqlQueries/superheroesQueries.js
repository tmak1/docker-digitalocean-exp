import { gql } from 'graphql-request';

export const getSuperheroes = gql`
  query SuperheroesQuery {
    superheroes {
      id
      name
      alterEgo
      sidekick
      age
    }
  }
`;

export const getSuperhero = gql`
  query SuperheroQuery($superheroId: ID!) {
    superhero(id: $superheroId) {
      id
      name
      alterEgo
      sidekick
      age
    }
  }
`;

export const createSupehero = gql`
  mutation CreateSuperheroMutation($superheroInputs: SuperheroInputs!) {
    superhero: createSuperhero(input: $superheroInputs) {
      id
      name
      alterEgo
      sidekick
      age
    }
  }
`;

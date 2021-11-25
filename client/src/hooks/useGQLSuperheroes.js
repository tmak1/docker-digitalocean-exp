import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GraphQLClient, request } from 'graphql-request';

import {
  getSuperheroes,
  getSuperhero,
  createSupehero,
} from '../gqlQueries/superheroesQueries';

const { REACT_APP_API_URL } = process.env;

const fetchSuperheroes = async () => {
  try {
    const data = await request(REACT_APP_API_URL, getSuperheroes);
    console.log(data);
    return data;
  } catch (error) {
    const errors = error.response.errors.map((err) => err.message).join(',\n');
    throw errors;
  }
};

const fetchSuperhero = async (superheroId) => {
  try {
    return await request(REACT_APP_API_URL, getSuperhero, { superheroId });
  } catch (error) {
    console.log(error);
  }
};

const addSuperhero = async (superhero) => {
  const token = 'asdiacnouw23123192djcc';
  const graphqlClient = new GraphQLClient(REACT_APP_API_URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  try {
    return await graphqlClient.request(createSupehero, {
      superheroInputs: superhero,
    });
  } catch (error) {
    console.log(error);
  }
};

export const useSuperheroes = () => {
  return useQuery('super-heroes', fetchSuperheroes, {
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useSuperhero = ({ superheroId }) => {
  return useQuery(['super-heroes', superheroId], () =>
    fetchSuperhero(superheroId)
  );
};

export const useAddSuperhero = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperhero, {
    onSuccess: (data) => {
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          superheroes: [data.superhero, ...oldQueryData.superheroes],
        };
      });
    },
  });
};

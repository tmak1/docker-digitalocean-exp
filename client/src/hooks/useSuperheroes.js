import { useQuery, useMutation, useQueryClient } from 'react-query';

const { REACT_APP_API_URL } = process.env;

const fetchSuperheroes = async ({ queryKey }) => {
  const [key, page, limit] = queryKey;
  console.log(key);
  const res = await fetch(
    `${REACT_APP_API_URL}/superheroes?page=${page}&limit=${limit}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data;
};

const fetchSuperheroesDetails = async ({ queryKey }) => {
  const sid = queryKey[1];
  const res = await fetch(`${REACT_APP_API_URL}/superheroes/${sid}`);
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data;
};

const addSuperhero = async (hero) => {
  const superhero = await fetch(`${REACT_APP_API_URL}/superheroes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hero),
  });
  return superhero;
};

export const useSuperheroes = ({ page, limit, onSuccess, onError }) => {
  return useQuery(['super-heroes', page, limit], fetchSuperheroes, {
    keepPreviousData: true,
    //keep shwoing previous data while fetching in background, allowed non flickering of list
    onSuccess,
    onError,
    // select: (data) =>
    //   data.superheroes.filter((hero) => hero.name !== 'Wonder Woman'),
  });
};

export const useSuperHeroesDetails = ({ sid, onSuccess, onError }) => {
  return useQuery(['super-hero-details', sid], fetchSuperheroesDetails, {
    onSuccess,
    onError,
  });
};

export const useAddSuperhero = ({ page, limit }) => {
  const queryClient = useQueryClient();
  return useMutation(addSuperhero, {
    onSuccess: async (response) => {
      const data = await response.json();
      queryClient.setQueryData(
        ['super-heroes', page, limit],
        (oldQueryData) => {
          return {
            superheroes: [...oldQueryData?.superheroes, data],
          };
        }
      );
    },
    onError: (error) => {
      console.log('THERE ', error);
    },
  });
};

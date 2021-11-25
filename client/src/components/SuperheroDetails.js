import React from 'react';
import { useParams } from 'react-router-dom';
import { useSuperhero } from '../hooks/useGQLSuperheroes';

const SuperheroDetails = () => {
  const { sid } = useParams();
  const {
    isLoading = false,
    isError = false,
    error = null,
    data,
  } = useSuperhero({
    superheroId: sid,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error?.message}</div>;
  }
  return data ? (
    <div>
      <h2>{data.superhero?.name}</h2>
      <h3>Alter ego: {data.superhero?.alterEgo}</h3>
      <p>Age: {data.superhero?.age}</p>
      <p>Sidekick: {data.superhero?.sidekick}</p>
    </div>
  ) : (
    <div>Could not fetch superhero</div>
  );
};

export default SuperheroDetails;

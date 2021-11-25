import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAddSuperhero, useSuperheroes } from '../hooks/useGQLSuperheroes';

const Superheroes = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');
  const [sidekick, setSidekick] = useState('');
  const [age, setAge] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const { isLoading, data, isError, error } = useSuperheroes();

  const mutation = useAddSuperhero();

  const handleSubmit = (event) => {
    event.preventDefault();
    const superhero = { name, alterEgo, sidekick, age };
    mutation.mutate(superhero);
  };
  const handleSeed = async () => {
    console.log('seeding...');
    await fetch('http://localhost:5000/api/seed');
  };
  useEffect(() => {
    setFormIsValid(name && alterEgo && sidekick && age);
  }, [name, alterEgo, sidekick, age]);

  return (
    <>
      <button onClick={handleSeed}>Seed</button>
      <br />
      <br />
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            Alter Ego
            <input
              type="text"
              value={alterEgo}
              onChange={(event) => setAlterEgo(event.target.value)}
            />
          </label>
          <label>
            Sidekick
            <input
              type="text"
              value={sidekick}
              onChange={(event) => setSidekick(event.target.value)}
            />
          </label>
          <label>
            Age
            <input
              type="text"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </label>
          <br />
          <br />
          {mutation?.isLoading ? (
            <div>Adding..</div>
          ) : (
            <button type="submit" disabled={!formIsValid}>
              Add super hero
            </button>
          )}
        </form>
      </div>
      <br />
      <br />
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error?.message}</div>}
      {data?.superheroes?.length > 0 ? (
        <ul>
          {data.superheroes?.map((superhero) => (
            <li key={superhero.id}>
              <Link to={`/superheroes/${superhero.id}`}>
                <p>Name: {superhero.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No superheroes found</div>
      )}
    </>
  );
};

export default Superheroes;

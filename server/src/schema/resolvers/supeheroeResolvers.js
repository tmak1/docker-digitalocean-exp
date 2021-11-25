import Superhero from '../../models/Superhero.js';

export const getSuperheroes = async () => {
  const superheroes = await Superhero.find({});
  return superheroes || [];
};

export const getSuperhero = async (parent, { id }) => {
  const superhero = await Superhero.findById(id);
  return superhero || {};
};

export const createSuperhero = async (parent, { input }) => {
  const { name, alterEgo, sidekick, age } = input;
  const superheroExists = await Superhero.findOne({ name });
  if (superheroExists) {
    throw new Error('That superhero already exists');
  }
  let superhero = new Superhero({
    name,
    alterEgo,
    sidekick,
    age,
  });
  superhero = await superhero.save();
  if (!superhero) {
    throw new Error('Could not create superhero', 500);
  }
  return superhero || {};
};

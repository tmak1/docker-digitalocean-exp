import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    alterEgo: {
      type: String,
      trim: true,
      required: true,
    },
    sidekick: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Superhero = mongoose.model('superhero', superheroSchema);

export default Superhero;

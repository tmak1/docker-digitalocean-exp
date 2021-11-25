import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import Superhero from './models/Superhero.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbData = await readFile(path.resolve(__dirname, './db.json'));
const db = JSON.parse(dbData);
const writeSuperheroes = async (superheroes) => {
  await writeFile(
    path.resolve(__dirname, './db.json'),
    JSON.stringify(superheroes)
  );
};

const clearDb = async () => {
  const { deletedCount } = await Superhero.deleteMany();
  console.log('deleted: ', deletedCount);
};

const seed = async () => {
  await clearDb();
  const sampleSuperheroes = db.superheroes;
  const createdSuperheroes = await Superhero.insertMany(sampleSuperheroes);
  console.log('inserted: ', createdSuperheroes.length);
};

export default seed;

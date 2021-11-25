import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import { typeDefs, resolvers } from './schema/schema.js';
import seed from './seed.js';

const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());

app.get('/api/seed', (req, res) => {
  seed();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req, res }) => {
  //   console.log(req.headers.authorization);
  // },
});

export { app, server };

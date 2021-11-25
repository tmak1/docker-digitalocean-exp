import { app, server } from './app.js';
import mongoConn from './mdb.js';

const { PORT_API: port } = process.env;
console.log('port', port);
await server.start();
server.applyMiddleware({ app, path: '/api/graphql' });

await mongoConn();

app.listen({ port }, (err) => {
  if (err) {
    return console.log('Could not connect to server');
  }
  console.log(`Listening: http://localhost:${port}${server.graphqlPath}`);
});

FROM node:16-alpine

RUN mkdir -p /home/node/app/server/node_modules && chown -R node:node /home/node/app/server

WORKDIR /home/node/app/server

COPY package.json .

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
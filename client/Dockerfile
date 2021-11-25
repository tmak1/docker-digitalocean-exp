FROM node:16-alpine

RUN mkdir -p /home/node/app/client/node_modules && chown -R node:node /home/node/app/client

WORKDIR /home/node/app/client

COPY package.json .

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 80

CMD [ "npm", "start" ]
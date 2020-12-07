FROM node:12-alpine

WORKDIR /home/node/app

COPY package.json ./

RUN npm install

COPY *.js ./

EXPOSE 8080

CMD [ "node", "index.js" ]
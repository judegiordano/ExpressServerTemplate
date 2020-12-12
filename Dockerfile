FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app
ENV NODE_ENV=production

EXPOSE 3000

CMD [ "npm", "run", "cluster" ]
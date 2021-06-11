FROM node:12.18-alpine

RUN npm install -g nodemon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 8000

CMD ["npm", "run", "server"]

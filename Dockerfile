FROM node:12.18-alpine

RUN npm install -g nodemon

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 3000

CMD ["npm", "run", "server"]

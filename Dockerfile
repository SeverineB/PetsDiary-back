FROM node:12.18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production --silent && mv node_modules ../

COPY . .

EXPOSE 3000

RUN yarn global add cross-env

RUN yarn global add dotenv

RUN yarn global add nodemon

CMD ["yarn", "server"]

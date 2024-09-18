FROM node:slim

WORKDIR /web

EXPOSE 3000

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

CMD ["yarn", "dev"]
FROM node:slim

WORKDIR /upload

EXPOSE 3334

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm", "run", "dev"] 
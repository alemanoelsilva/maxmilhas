FROM node:14.0.0

RUN apt update

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN mkdir request-file
RUN npm install

EXPOSE 3001

ENTRYPOINT ["npm", "start"]
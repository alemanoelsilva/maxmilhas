
# MaxMilhas Test Code

## This repository contains the backend test for node developers at MaxMilhas

## The basic configuration you will need to run the application is

```sh
NODE_ENV=development

PORT=3001

# MONGO
MONGO_DATABASE_URI=mongodb://localhost:27017/maxmilhas
MONGO_DATABASE_URI_TEST=mongodb://localhost:27017/maxmilhas_test
MONGO_DATABASE_NAME=maxmilhas
MONGO_DATABASE_NAME_TEST=maxmilhas_test

CPF_COLLECTION=CPF

# FILE MANAGER
FILE_PATH=./request-file/amount.txt

LOGGER_LEVEL=trace
BACKUP_FILE_LOG=/logs

```

You can find the `.env.example` in the root folder and just rename it to `.env`

# Running

## Docker

For this project, you will need a Mongo Docker Container running.

Run the follow command: `docker run --name local-mongo -p 27017:27017 -d mongo`

The application, you can run through docker or local.

### Running with docker:
1. Build the image: `docker build -t maxmilhas_api:1.0.0 .`
2. Run the container: `docker run maxmilhas_api:1.0.0 -p:3001:3001`

### Running local:
1. Install the dependencies: `npm i`
2. Run the application: `npm start`

## Docker Compose

The application can also be run with docker-compose, you just need to run the following command: `docker-compose up`

# Testing

As the test requirements, you can run the unit test through npm, running `npm run test:unit`

# Insomnia

At the folder `insomnia_file` you will find the curls to execute each endpoint.
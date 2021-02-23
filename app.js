const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { responseNotFound } = require('./middlewares/not-found');
const { error } = require('./middlewares/error');

const blacklistRoutes = require('./v1/blacklist/routes');
const serverStatusRoutes = require('./v1/server-status/routes');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

blacklistRoutes(app);
serverStatusRoutes(app);

app.use(responseNotFound);
app.use(error);

module.exports = app;

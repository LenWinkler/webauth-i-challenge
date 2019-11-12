const express = require('express');

const configureMiddleware = require('./configure-middleware.js');

const server = express();
server.use(express.json());

configureMiddleware(server);

module.exports = server;
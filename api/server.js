const express = require('express');

const ApiRouter = require('./api-router.js');
const configureMiddleware = require('./configure-middleware.js');

const server = express();
server.use(express.json());

configureMiddleware(server);

server.use('/api', ApiRouter);

module.exports = server;
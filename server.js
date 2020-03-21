const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./Routers/projectRouter');
const actionRouter = require('./Routers/actionRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send('<h2>Sprint Challenge</h2>');
});


module.exports = server;
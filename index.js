'use strict';

require('dotenv').config();

let PORT = process.env.PORT || 3000;
const server = require('./auth/server');
const { db } = require('./auth/models/index.model');


db.sync()
.then(() => {
  server.start(PORT);
}).catch(e => {
  console.error('Could not start server', e.message);
});
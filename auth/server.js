'use strict'; 

const express = require('express');
const app = express();

const notFoundError = require('./error-handlers/404');
const internalError = require('./error-handlers/500');
const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use(signupRouter);
app.use(signinRouter);

app.use('*', notFoundError);
app.use(internalError);


const start = (PORT) => {
    app.listen(PORT, () => {
        console.log(`Server is up and listening on PORT ${PORT}`);
    });
};

module.exports = {
    app: app,
    start: start,
};
'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const { users } = require('../models/index.model');
const signinRouter = express.Router();
const signinAuth = require('../middleware/basic-auth');

signinRouter.post('/signin', signinAuth, async (req, res) => {
    let basicHeaderParts = req.headers.authorization.split(' ');
    let encodedString = basicHeaderParts.pop();
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(':');
    try {
    const user = await users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
        res.status(200).json(user);
    }
    else {
        throw new Error('Invalid User');
    }
    } catch (error) { res.status(403).send('Invalid Login'); }
});

module.exports = signinRouter;
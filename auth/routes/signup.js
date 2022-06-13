'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { users } = require('../models/index.model');
const signupRouter = express.Router();

signupRouter.post('/signup', async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const record = await users.create(req.body);
      res.status(200).json(record);
    } catch (e) { res.status(403).send('Error Creating User'); }
  });

  module.exports = signupRouter;
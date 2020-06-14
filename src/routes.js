'use strict';

const express = require('express');
const router = express.Router();

const { user } = require('./controllers');
const { auth, validation, schema } = require('./utils');

// User Routes
router.post('/user/login', validation.body(schema.user.login), user.login);
router.post('/user', validation.body(schema.user.createUser), user.create);
router.get('/users', auth.checkAuth, user.getAll);
router.get('/user/:id', auth.checkAuth, validation.params(schema.user.getUserId), user.getDetail);
router.post('/user/:id', auth.checkAuth, validation.body(schema.user.createUser), validation.params(schema.user.getUserId), user.update);
router.delete('/user/:id', auth.checkAuth, validation.params(schema.user.getUserId), user.remove);

module.exports = router;

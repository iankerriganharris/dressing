// routers/commentRouter.js
// Comment router.

const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const isLoggedIn = require('../helpers/isLoggedIn');
const mysql = require('mysql');
const dbconfig = require('../config/database');

// Any request invokes this.
router.use(isLoggedIn, function(req, res, next) {
  // ...
  next();
});

module.exports = router;

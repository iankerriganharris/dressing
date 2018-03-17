// routers/searchRouter.js
// Search router.

const express = require('express');
const router = express.Router();
const isLoggedIn = require('../helpers/isLoggedIn');
const mysql = require('mysql');
const dbconfig = require('../config/database');

const options = {};
let mySearchIndex;
const indexData = function(err, index) {
    if (!err) {
        mySearchIndex = index;
        const connection = mysql.createConnection(dbconfig.connection);
        connection.query('USE ' + dbconfig.database);
        connection.query('SELECT * FROM users')
        .stream({highWaterMark: 5})
        .pipe(index.defaultPipeline())
        .pipe(index.add())
        .on('finish', function() {
          console.log('Search index is ready.');
        });
    }
};
require('search-index')(options, indexData);

// Any request invokes this.
router.use(isLoggedIn, function(req, res, next) {
  // ...
  if (mySearchIndex) {
    next();
  } else {
    console.log('Search index is not ready.');
    res.redirect('/');
  }
});

const q = {query: [{AND: {'*': ['harrisiank']}}]};
router.get('/', function(req, res) {
  mySearchIndex.search(q)
  .on('data', function(data) {
    console.log(data);
  });
});

module.exports = router;

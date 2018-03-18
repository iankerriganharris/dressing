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

// const q = {query: [{AND: {'*': ['harrisiank']}}]};
// const q = {query: [{AND: {'*': [req.query.qs]}}]};
router.get('/', function(req, res) {
  let body = {matches: []};
  mySearchIndex.search({query: [{
    AND: {'*': [req.query.qs]},
  }]})
  .on('data', (data) => {
    console.log(data);
    body.matches.push({title: data.document.username});
  }).on('finish', function() {
    try {
      res.json(body);
    } catch (err) {
      console.log(err);
      res.json({'status': 200});
    }
  });
});

router.get('/autosuggest', function(req, res) {
  let body = {matches: []};
  mySearchIndex.match({beginsWith: req.query.qs, field: 'username'})
  .on('data', (chunk) => {
    body.matches.push({title: chunk});
  }).on('end', function() {
    try {
      console.log(JSON.stringify(body));
      res.json(body);
    } catch (err) {
      console.log(err);
      res.json({'status': 200});
    }
  });
});

module.exports = router;

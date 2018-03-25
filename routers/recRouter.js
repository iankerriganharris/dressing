// routers/recRouter.js
// Recommendation router.

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

router.post('/new', function(req, res) {
  const connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  const newRecMysql = {};
  const busboy = new Busboy({headers: req.headers});
  busboy.on('field', function(fieldname, val) {
    switch (fieldname) {
      case 'description':
        newRecMysql.description = val;
        break;
      case 'url':
        newRecMysql.url = val;
        break;
      case 'post_id':
        newRecMysql.post_id = val;
        break;
    }
  });
  busboy.on('finish', function() {
    console.log('Busboy finished parsing.');
    console.log(newRecMysql);
    console.time('dbinsert');
    const insertQuery =
      `INSERT INTO recommendations 
        (description, url, fk__post__rec, fk__user__rec) 
        VALUES (?, ?, ?, ?)`;
    connection.query(
      insertQuery, [newRecMysql.description,
        newRecMysql.url, newRecMysql.post_id, req.user.id],
      function(err, rows) {
        if (err) {
          console.log('SQL errors: ' + err);
        }
      }
    );
    console.timeEnd('dbinsert');
  });
  req.pipe(busboy);
  res.redirect('/');
});

module.exports = router;

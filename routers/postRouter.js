// routers/postRouter.js
// Post router.

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

router.get('/', function(req, res) {
  const connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  const selectQuery =
    `SELECT * FROM posts
      WHERE fk__user__post = ?`;
  connection.query(
    selectQuery, req.user.id,
    function(err, rows) {
      if (err) {
        console.log('SQL errors: ' + err);
      } else {
        return (res.json(rows));
      }
    }
  );
});

// Post post.
router.post('/new', function(req, res) {
  const connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  const newPostMysql = {};
  const busboy = new Busboy({headers: req.headers});
  busboy.on('field', function(fieldname, val) {
    switch (fieldname) {
      case 'description':
        newPostMysql.description = val;
        break;
      case 'url':
        newPostMysql.url = val;
        break;
    }
  });
  busboy.on('finish', function() {
    console.log('Busboy finished parsing.');
    console.log(newPostMysql);
    console.time('dbinsert');
    const insertQuery =
      `INSERT INTO posts (description, url, fk__user__post) 
        VALUES (?, ?, ?)`;
    connection.query(
      insertQuery, [newPostMysql.description, newPostMysql.url, req.user.id],
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

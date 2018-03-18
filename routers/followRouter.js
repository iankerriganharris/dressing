// routers/followRouter.js
// Follow router.

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
});

router.post('/', function(req, res) {
  const connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  const newFollowMysql = {};
  const busboy = new Busboy({headers: req.headers});
  busboy.on('field', function(fieldname, val) {
    switch (fieldname) {
      case 'follow':
        newFollowMysql.follow = val;
        break;
    }
  });
  busboy.on('finish', function() {
    console.log('Busboy finished parsing.');
    console.log(newFollowMysql);
    console.time('dbinsert');
    const selectQuery = 'SELECT id FROM USERS WHERE username = ?';
    const insertQuery =
    'INSERT INTO follows (id_user, id_follower) VALUES (?, ?)';
    connection.query(selectQuery, newFollowMysql.follow, function(err, rows) {
      if (err) {
        console.log('SQL errors: ' + err);
      } else {
        connection.query(insertQuery, [rows[0].id, req.user.id],
          function(err, rows) {
            if (err) {
              console.log('SQL errors: ' + err);
            }
          });
      }
    });
    /*
    connection.query(
      insertQuery, [newFollowMysql.follow, req.user.id],
      function(err, rows) {
        if (err) {
          console.log('SQL errors: ' + err);
        }
      });
    */
    console.timeEnd('dbinsert');
    }
  );
  req.pipe(busboy);
  res.redirect('/');
});

module.exports = router;

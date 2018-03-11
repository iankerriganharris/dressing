// routers/userRouter.js
// User (Profile) router.

const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const mysql = require('mysql');
const dbconfig = require('../config/database');
const isLoggedIn = require('../helpers/isLoggedIn');

// Any request invokes this.
router.use(isLoggedIn, function(req, res, next) {
  // ...
  next();
});

// Get user.
router.get('/', function(req, res) {
  // console.log(req.user);
  res.send(
    JSON.stringify(
      {'status': 200, 'error': null,
        'response': {user: req.user},
    }, hideJsonValue
    )
  );
});

router.get('/:username', function(req, res) {
  const connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  const selectQuery = 'SELECT * FROM users WHERE username=?';
  connection.query(
    selectQuery, [req.params.username],
      function(err, rows) {
        if (err) {
          console.log(err);
        } else {
            return (res.send(
              JSON.stringify(
                {'status': 200, 'error': null,
                  rows,
              }, hideJsonValue
              )
            )
          );
        }
      });
});

// Post user.
router.post('/', function(req, res) {
  const connection = mysql.createConnection(dbconfig.connection);
  connection.query('USE ' + dbconfig.database);
  const busboy = new Busboy({headers: req.headers});
  busboy.on('field', function(fieldname, val) {
    const updateUserMysql = {
      column: fieldname,
      value: val,
    };
    const updateQuery =
      'UPDATE users SET ??=? WHERE id=?';
    connection.query(
      updateQuery, [updateUserMysql.column, updateUserMysql.value, req.user.id],
      function(err, rows) {
        if (err) {
          console.log('SQL errors: ' + err);
        }
      });
  });
  busboy.on('finish', function() {
    console.log('Busboy finished parsing.');
  });
  req.pipe(busboy);
  res.redirect('/profile');
});

/**
 *
 * @param {*} key
 * @param {*} value
 * @return {*}
 */
function hideJsonValue(key, value) {
  if (key == 'password') {
    return undefined;
  } else return value;
}

module.exports = router;

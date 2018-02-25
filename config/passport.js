// config/passport.js
// Reference: https://github.com/manjeshpv/node-express-passport-mysql

// Get what we need.
const LocalStrategy = require('passport-local').Strategy;

// User model.
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const dbconfig = require('./database');
const connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {
  // Session setup.
  // Serialize user.


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // Deserialize user.
  passport.deserializeUser(function(id, done) {
    connection.query(
      'SELECT * FROM users WHERE id = ? ', [id], function(err, rows) {
        done(err, rows[0]);
    });
  });

  // Local signup.
  passport.use(
    'local-signup',
    new LocalStrategy( {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    function(req, username, password, done) {
      // Check if the user already exists.
      connection.query(
        'SELECT * FROM users WHERE username = ?', [username],
        function(err, rows) {
          if (err) {
            return done(err);
          }
          if (rows.length) {
            return done(null, false);
            } else {
              // Create the user if the username is not already taken.
              const salt = bcrypt.genSaltSync(10);
              const newUserMysql = {
                username: username,
                password: bcrypt.hashSync(password, salt, null),
              };
              const insertQuery =
                'INSERT INTO users (username, password) values (?, ?)';
              connection.query(
                insertQuery, [newUserMysql.username, newUserMysql.password],
                function(err, rows) {
                  console.log('SQL errors: ' + err);
                  newUserMysql.id = rows.insertId;
                  return done(null, newUserMysql);
                });
            }
        });
      })
    );
  // Local login.
  passport.use(
    'local-login',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    function(req, username, password, done) {
      connection.query('SELECT * FROM users WHERE username = ?', [username],
        function(err, rows) {
          if (err) {
            console.log('Error: ' + err);
            return done(err);
          }
          // Username not found.
          if (!rows.length) {
            console.log('Username not found: ' + username);
            return done(null, false);
          }
          // Incorrect password.
          if (!bcrypt.compareSync(password, rows[0].password)) {
            return done(null, false);
          }
          // Success.
          console.log('Successful login!');
          return done(null, rows[0]);
        }
      );
    })
  );
};

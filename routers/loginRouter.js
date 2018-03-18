// routers/loginRouter.js
// Login router.

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Any request invokes this.
router.use(function(req, res, next) {
  // ...
  next();
});

router.get('/', function(req, res) {
});

router.post('/',
  passport.authenticate('local-login', {failureRedirect: '/login'}),
  function(req, res) {
    req.session.save(() => {
      res.redirect('/profile');
    });
  }
);

module.exports = router;

// routers/signupRouter.js
// Signup router.

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
  passport.authenticate('local-signup', {
    failureRedirect: '/',
  }),
  function(req, res) {
    res.send(
      JSON.stringify(
        {'status': 200, 'error': null, 'response': null}
      )
    );
});

module.exports = router;

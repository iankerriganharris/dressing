// helpers/isLoggedIn.js

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.user) {
    console.log('Authenticated!');
    next();
  } else {
    console.log(
      'Not authenticated. Requests must contain {credentials: \'include\'}');
    res.redirect('/login');
  }
};

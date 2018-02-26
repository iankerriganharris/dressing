// routes.js

// Get our routers.
const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');
const signupRouter = require('./routers/signupRouter');
const postRouter = require('./routers/postRouter');
const followRouter = require('./routers/followRouter');

// Set our routes.
module.exports = function(app, passport) {
  app.use(['/user', '/profile'], userRouter);
  app.use('/login', loginRouter);
  app.use('/signup', signupRouter);
  app.use('/post', postRouter);
  app.use('/follow', followRouter);

  app.get('/logout', function(req, res) {
    req.logOut();
    req.session.destroy(() => {
      res.json({'status': 200});
    });
  });
};

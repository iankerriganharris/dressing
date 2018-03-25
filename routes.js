// routes.js

// Get our routers.
const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');
const signupRouter = require('./routers/signupRouter');
const postRouter = require('./routers/postRouter');
const followRouter = require('./routers/followRouter');
const searchRouter = require('./routers/searchRouter');
const commentRouter = require('./routers/commentRouter');
const recRouter = require('./routers/recRouter');

// Set our routes.
module.exports = function(app, passport, busboy) {
  app.use(['/user', '/profile'], userRouter);
  app.use('/login', loginRouter);
  app.use('/signup', signupRouter);
  app.use('/post', postRouter);
  app.use('/follow', followRouter);
  app.use('/search', searchRouter);
  app.use('/comment', commentRouter);
  app.use('/recommend', recRouter);

  app.get('/logout', function(req, res) {
    req.logOut();
    req.session.destroy(() => {
      res.json({'status': 200});
    });
  });
};

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const fabricsRouter = require('./routes/fabrics.js');
const postsRouter = require("./routes/posts");
const patternRouter = require("./routes/pattern.js");
const notionsRouter = require("./routes/notions.js");
const projectsRouter = require("./routes/projects.js")
require('./passport.js');
require('dotenv').config();

const port = 8080;

//connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to DB', err));

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();

//session configuration
app.use(
  session(
    { secret: 'Scrumbags', httpOnly: false, resave: false, saveUninitialized: true },
    {
      cookie: {
        maxAge: 60000
      }
    }
  )
);

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use('/api/fabrics', isLoggedIn, fabricsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/patterns", patternRouter)
app.use('/api/notions', notionsRouter)
app.use('/api/projects', projectsRouter)

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  isLoggedIn,
  (req, res) => {
    res.redirect('/fabrics');
  }
);

app.get('/auth/failure', (req, res) => {
  res.send('Authentication failure');
});

app.get('/protected', isLoggedIn, (req, res) => {
  if (!req.user) {
    res.status(401).send('Unauthorized')
  }
  res.send(`Hello ${req.user.username}`);
});

app.route('/logout').get((req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Failed to log out');
      }

      res.clearCookie('connect.sid');

      res.redirect('/');
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '..', 'dist') });
});

app.listen(port, () => {
  console.log(`Spooler listening At http://localhost:${port}`);
});

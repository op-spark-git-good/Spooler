const express = require('express');
const cors = require('cors');
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

app.use(
  session({
    secret: process.env.SESSION_SECRET || "Scrumbags",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000, httpOnly: true },
  })
);

//middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use('/api/fabrics', fabricsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/patterns", patternRouter)
app.use('/api/notions', notionsRouter)
app.use('/api/projects', projectsRouter)

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  isLoggedIn,
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/auth/failure', (req, res) => {
  res.send('Authentication failure');
});

app.get("/auth/current_user", (req, res) => {
  res.send(req.user || null);
});

app.get('/protected', isLoggedIn, (req, res) => {
  if (!req.user) {
    res.status(401).send('Unauthorized')
  }
  res.send(`Hello ${req.user.username}`);
});

app.get("/logout", async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to log out');
      }
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});

// temporarily removing "isLoggedIn" from the below router, just to make editing easier until we figure out Link security
app.get('*', /*isLoggedIn, */(req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '..', 'dist') });
});

app.listen(port, () => {
  console.log(`Spooler listening At http://localhost:${port}`);
});

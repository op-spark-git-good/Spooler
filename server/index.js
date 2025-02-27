const express = require("express");
const passport = require("passport");
const path = require("path");
const session = require("express-session");
require("./passport.js");
require("dotenv").config();

const port = 5500;

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();

//session configuration
app.use(session({ secret: "Scrumbags" }));

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));

//Routes
app.get("/", (req, res) => {
  res.send('<a href="/auth/google"> Authenticate with Google </a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    res.redirect("/protected");
  }
);

app.get("/auth/failure", (req, res) => {
  res.send("Authentication failure");
});

app.get("/protected", isLoggedIn, (req, res) => {

  res.send(`Hello ${req.user.displayName}`);
});


app.route('/logout')
.get((req, res) => {
req. logout(function(err) {
if (err) { return next(err); } res.redirect('/');
});
})

app.listen(port, () => {
  console.log(`Spooler listening At http://localhost:${port}`);
});

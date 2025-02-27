const express = require("express");
const passport = require('passport')
const path = require("path");
const app = express();
const port = 5500;

 require("./passport.js");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.send('<a href="/auth/google"> Authenticate with Google </a>');
});

app.get("/auth/google",
  passport.authenticate('google', {scope: ['email', 'profile']})
)

app.get("/protected", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Spooler listening At http://localhost:${port}`);
});

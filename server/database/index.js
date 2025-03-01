const { connect } = require("mongoose");
const { Fabrics } = require("./models/Fabrics.js");
const { Users } = require("./models/Users.js");
const { Projects } = require("./models/Projects.js");
const { Posts } = require("./models/Posts.js");
const { Patterns } = require("./models/Pattern.js");
const { Notions } = require("./models/Notions.js");

const db = "Spooler";
const dbUri = `mongodb://localhost:27017/${db}`;

connect(dbUri)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.error("Could not connect to DB", err);
  });

module.exports = {
  Fabrics,
  Users,
  Projects,
  Patterns,
  Posts,
  Notions
};

const { connect, Schema } = require("mongoose");
const { Fabrics } = require("./models/Fabrics.js");
const { Users } = require("./models/Users.js");

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
};

const { connection } = require('mongoose');
const {
  Fabrics,
  Users,
  Projects,
  Patterns,
  Posts,
  Notions } = require("../../database");

const fabricsData = require("./fabricSeed.js");
const notionsData = require("./notionsSeed.js");
const usersData = require("./userSeed.js")

const seedAll = () => {
  let models = [Fabrics, Notions, Users];
  let arrays = [fabricsData, notionsData, usersData]
  models.forEach((mod, i) => {
  //   const array = model.toLowerCased
  seedDatabase(mod, arrays[i]);
})
}



const seedDatabase = (model, array) => {
  // Remove all documents in collection
  model.deleteMany()
    .then(({ deletedCount }) => console.info(`Removed ${deletedCount} documents`))
    // Insert example data into the database
    .then(() => model.insertMany(array))
    .then(({ length }) => console.info(`Inserted ${length}`))
    // Close the database connection after seeding is complete
    .then(() => connection.close())
    .then(() => console.info('\nComplete!'))
    // Handle errors in promise chain
    .catch((err) => console.error(`${model} could not be seeded`, err))
    // Gracefully exit the process
    .finally(() => process.exit());
};
seedAll();

module.exports = {
  seedDatabase,
  seedAll,
}
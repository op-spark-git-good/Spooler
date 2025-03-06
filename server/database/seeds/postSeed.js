const users = require("./userSeed.js");

const postSeed = [
  {
    ownerId: users[0]._id,
    title: "test post 1",
    author: users[0].username,
    content: "test post 1 content",
    likes: [],
    comments: [],
  },
  {
    ownerId: users[1]._id,
    title: "test post 2",
    author: users[1].username,
    content: "test post 2 content",
    likes: [],
    comments: [],
  },
];

module.exports = postSeed;

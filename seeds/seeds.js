const sequilize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./user.Data.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  try {
    await sequilize.sync({ force: true });
    console.log("\n---- Database sync OK ----\n");

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n---- Users seeded ----\n");

    const post = await Post.bulkCreate(postData);

    // for (const post of postData) {
    //   await Post.create({
    //     ...post,
    //     user_id: users[Math.floor(Math.random() * users.length)].id,
    //   });
    // }
    console.log("\n---- Post seeded ----\n");

    const comment = await Comment.bulkCreate(commentData);

    console.log("\n---- Comment seeded ----\n");
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

seedDatabase();

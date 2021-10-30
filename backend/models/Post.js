module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    userId: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    imgURL: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Post;
};

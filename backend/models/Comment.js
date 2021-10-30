module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    author: {
      type: Sequelize.STRING,
    },
    authorId: {
      type: Sequelize.INTEGER,
    },
    postId: {
      type: Sequelize.INTEGER,
    },
    comment: {
      type: Sequelize.STRING,
    },
  });

  return Comment;
};

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    author: {
      type: Sequelize.STRING,
    },

    authorId: {
      type: Sequelize.INT,
    },
    postId: {
      type: Sequelize.INT,
    },
    comment: {
      type: Sequelize.STRING,
    },
  });

  return Comment;
};

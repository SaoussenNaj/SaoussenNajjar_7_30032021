const fs = require("fs");
const db = require("../models");

// Ajout d'un commentaire
exports.addComment = (req, res, next) => {
  db.user
    .findOne({
      attributes: ["username"],
      where: { id: req.body.userId },
    })
    .then((user) => {
      const newComment = {
        author: user.dataValues.username,
        authorId: req.body.userId,
        postId: req.params.id,
        comment: req.body.comment,
      };
      db.comment.create(newComment).then(() => {
        res.status(201).json({ message: "Commentaire ajouté!" });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Modifier un commentaire
exports.modifyComment = (req, res, next) => {
  db.user
    .findOne({
      attributes: ["isAdmin"],
      where: { id: req.body.userId },
    })
    .then((user) => {
      db.comment
        .findOne({
          attributes: ["authorId"],
          where: { id: req.params.id },
        })
        .then((comment) => {
          //verifier si l'utilisateur est admin ou pas
          if (
            req.body.userId == comment.dataValues.authorId ||
            user.dataValues.isAdmin == "1"
          ) {
            const newComment = {
              comment: req.body.comment,
            };
            db.comment
              .update(newComment, { where: { id: req.params.id } })
              .then(() => {
                res.status(201).json({ message: "Commentaire modifié!" });
              });
          } else {
            res.status(401).json({ error: "unauthorized" });
          }
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
  db.user
    .findOne({
      attributes: ["isAdmin"],
      where: { id: req.body.userId },
    })
    .then((user) => {
      db.comment
        .findOne({
          attributes: ["authorId"],
          where: { id: req.params.id },
        })
        .then((comment) => {
          //verifier si l'utilisateur est admin ou pas
          if (
            req.body.userId == comment.dataValues.authorId ||
            user.dataValues.isAdmin == "1"
          ) {
            db.comment
              .destroy({
                where: { id: req.params.id },
              })
              .then(() => {
                res.status(201).json({ message: "Commentaire supprimé !" });
              });
          } else {
            res.status(401).json({ error: "unauthorized" });
          }
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

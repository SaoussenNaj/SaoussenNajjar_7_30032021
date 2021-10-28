const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const fs = require("fs");

// Inscription de nouveaux utilisateurs
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin: false,
      };
      db.user
        .create(user)
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connecter un utilisateur existant
exports.login = (req, res, next) => {
  db.user
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // on compare le mdp entré par l'utilisateur avec le hash enregistré dans la BD
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          return res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "2h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
//supprimer un utilisateur
exports.delete = (req, res, next) => {
  db.user
    .findOne({
      where: { id: req.body.userId },
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé!" });
      }
      //
      bcrypt
        .compare(req.body.password, user.dataValues.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrecte !" });
          }
          //supprimer l'utilisateur et tous les posts qui lui correspond
          db.user.destroy({ where: { id: req.body.userId } });
          Post.findAll({ where: { userId: req.body.userId } })
            .then((result) => {
              let postsId = [];
              let postsUrlImage = [];
              for (let i = 0; i < result.length; i++) {
                postsId.push(result[i].id);
                postsUrlImage.push(result[i].imgURL.split("/images/")[1]);
              }
              //trouver les images liés aux posts et les supprimer
              for (let i = 0; i < postsUrlImage.length; i++) {
                fs.unlink(`images/${postsUrlImage[i]}`, (err) => {
                  if (err) {
                    console.log(`images/${postsUrlImage[i]} not found !`);
                  } else {
                    console.log(`deleted old images/${postsUrlImage[i]}`);
                  }
                });
              }
              //et supprime les commentaires des utilisateurs, ainsi que les commentaires liés aux publications qui ont été supprimées
              db.comment.destroy({
                where: {
                  [Op.or]: [{ authorId: req.body.userId }, { postId: postsId }],
                },
              });
              //delete user posts
              Post.destroy({ where: { userId: req.body.userId } }).then(() => {
                res.status(200).json({ message: "User deleted" });
              });
            })
            .catch((error) => res.status(401).json({ error }));
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

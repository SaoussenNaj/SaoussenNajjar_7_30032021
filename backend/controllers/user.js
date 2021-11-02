const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const fs = require("fs");
const Op = db.Sequelize.Op;

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
            isAdmin: user.isAdmin,
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
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  console.log(req.body.password);
  db.user
    .findOne({
      where: { id: userId },
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
          db.user.destroy({ where: { id: userId } });
          db.post
            .findAll({ where: { userId: userId } })
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
                  [Op.or]: [{ authorId: userId }, { postId: postsId }],
                },
              });
              //delete user posts
              db.post.destroy({ where: { userId: userId } }).then(() => {
                res.status(200).json({ message: "User deleted" });
              });
            })
            .catch((error) => res.status(401).json({ error }));
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAdmins = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  db.user
    .findOne({
      attributes: ["isAdmin"],
      where: { id: userId },
    })
    .then((user) => {
      if (user.dataValues.isAdmin == "1") {
        db.user
          .findAll({
            where: { isAdmin: "1" },
          })
          .then((users) => {
            res.status(200).json({ users });
          })
          .catch((error) => res.status(500).json({ error }));
      } else {
        throw new Error("unauthorized");
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  db.user
    .findOne({
      attributes: ["username", "email", "id", "isAdmin"],
      where: { id: userId },
    })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => res.status(500).json({ error }));
};

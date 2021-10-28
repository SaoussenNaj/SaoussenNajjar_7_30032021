const db = require("../models");
const fs = require("fs");

// Lire tous les posts avec leurs comments
exports.getPosts = (req, res, next) => {
  db.post
    .findAll()
    .then((posts) => {
      db.comment.findAll().then((comments) => {
        // retourne un objet json result contenant des posts et des comments
        res.status(200).json({
          result: {
            posts: posts,
            comments: comments,
          },
        });
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

//Creer un post
exports.createPost = (req, res, next) => {
  db.user
    .findOne({
      attributes: ["username"],
      where: { id: req.body.userId },
    })
    .then((user) => {
      console.log(user);

      const newPost = {
        userId: req.body.userId,
        title: req.body.title,
        username: user.dataValues.username,
        description: req.body.description,
        imgURL: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      };
      db.post
        .create(newPost)
        .then(() => {
          res.status(201).json({ message: "Post créé !" });
        })
        .catch((error) => res.status(500).json({ error }));
    });
};

//  modifier un post
exports.modifyPost = (req, res, next) => {
  db.user
    .findOne({
      attributes: ["isAdmin"],
      where: { id: req.body.userId },
    })
    .then((user) => {
      db.post
        .findOne({
          attributes: ["userId", "username", "imgURL"],
          where: { id: req.params.id },
        })
        .then((post) => {
          //verifier s'il s'agit du meme utilisateur ou un admin
          if (
            req.body.userId == post.dataValues.userId ||
            user.dataValues.isAdmin == "1"
          ) {
            let postObject = {
              title: req.body.title,
              description: req.body.description,
            };
            const filename = post.dataValues.imgURL.split("/images/")[1];
            if (req.file) {
              //supprimer l'ancienne image si une nouvelle image est postée
              postObject["imgURL"] = `${req.protocol}://${req.get(
                "host"
              )}/images/${req.file.filename}`;
              fs.unlink(`images/${filename}`, (err) => {
                if (err) {
                  console.log(`images/${filename} not found !`);
                } else {
                  console.log(`deleted old images/${filename}`);
                }
              });
            }
            db.post
              .update(postObject, { where: { id: req.params.id } })
              .then(() => {
                console.log("post modifié par " + user.dataValues.username);
                res.status(200).json({ message: "post modifié!" });
              })
              .catch((error) => res.status(500).json({ error }));
          } else {
            throw new Error("unauthorized");
          }
        })
        .catch((error) => res.status(401).json({ error: "Invalid user ID" }));
    });
};

// supprimer post
exports.deletePost = (req, res, next) => {
  db.user
    .findOne({
      attributes: ["isAdmin", "username"],
      where: { id: req.body.userId },
    })
    .then((user) => {
      db.post
        .findOne({
          attributes: ["userId", "imgURL"],
          where: { id: req.params.id },
        })
        .then((post) => {
          //verifier si il s'agit d'un utilisateur ou d'un admin
          if (
            req.body.userId == post.dataValues.userId ||
            user.dataValues.isAdmin == "1"
          ) {
            const filename = post.dataValues.imgURL.split("/images/")[1];
            //supprimer l'image liée au post
            fs.unlink(`images/${filename}`, () => {
              console.log(`deleted images/${filename}`);
              //supprimer le post séleectionné
              db.post
                .destroy({
                  where: { id: req.params.id },
                })
                .then(() => {
                  //effacer les commentaires relié au post supprimé
                  db.comment
                    .destroy({
                      where: { postId: req.params.id },
                    })
                    .then(() => {
                      console.log(
                        "Item deleted by userId " + user.dataValues.username
                      );
                      res.status(200).json({ message: "Item deleted!" });
                    });
                })
                .catch((error) => res.status(400).json({ error }));
            });
          } else {
            throw new Error("unauthorized");
          }
        })
        .catch((error) => res.status(401).json({ error }));
    });
};

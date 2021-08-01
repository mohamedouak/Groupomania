const sequelize = require("sequelize");
const { User, Post, Comment } = require("../sequelize");
const fs = require("fs");
const token = require("../utilis/getUserIdByJwt");

exports.createPost = async (req, res) => {
  console.log(req.body);
  console.log("req.file", req.file);
//   if (!req.body.title || !req.body.content) {
//     return res
//       .status(400)
//       .json({ error: "Tous les champs doivent être remplis" });
//   }
  const post = {
    userId: token.getUserIdByJwt(req),
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
  };
  console.log(post);
  const newPost = await Post.create(post);
  if (newPost) {
    res.status(201).json(newPost);
  } else {
    res.status(401).json({ error: "error" });
  }
};

exports.getOnePost = (req, res) => {
  const id = req.params.id;
  Post.findOne({ where: { id: req.params.id},    
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
    })
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Post non trouvé",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.getAllPosts = (req, res) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username", "email"],
      },
    ],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => {
      res.status(500).json({ message: "Erreur de requête" });
    });
};

exports.updatePost = (req, res) => {
  console.log(req.body.title);
  const id = req.params.id;
  const updatedPost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
  };
  Post.update(updatedPost, { where: { id: id } })
    .then((post) => {
      res.status(200).json({
        message: "Post modifié",
        post: updatedPost,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Post non modifié",
        error: error,
      });
    });
};

exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.destroy({ where: { id: id } })
    .then((post) => {
      if (post) {
        res.status(200).json({
          message: "Post supprimé",
        });
      } else {
        res.status(404).json({
          message: "Post non trouvé",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Post non supprimé",
        error: error,
      });
    });
};

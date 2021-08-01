const sequelize = require('sequelize');
const {User, Post, Comment} = require('../sequelize');
const token = require('../utilis/getUserIdByJwt');

exports.getCommentsByPost = (req,res) => {
    Comment.findAll({ where: { postId: req.params.postId },
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: Post,
                attributes: ['content']
            },
            {
                model: User,
                attributes: ['username']
            }
        ],        
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => {res.status(500).json({message: 'Erreur de requête'})
    })
}

// Fonction CREATE
exports.newComment = async (req, res) => {
    console.log(req.body);
    if (!req.body.content) {
        return res.status(400).json({ error: 'Aucun contenu' });
    }
    if (req.body.postId == null ) {
        return res.status(401).json({ error: 'Il manque un champ à renseigner'})
    }
    const comment = {
        postId: req.body.postId,
        userId: token.getUserIdByJwt(req),
        content: req.body.content,
    };
    const newComment = await Comment.create(comment)
    if (newComment) {
        res.status(201).json(newComment)
    } else {
        res.status(401).json({error : 'error'})
    }
};

// Fonction DELETE
exports.deleteComment = (req, res) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
        .catch(error => res.status(500).json({ error }));
};




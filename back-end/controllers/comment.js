const sequelize = require('sequelize');
const {User, Post, Comment} = require('../sequelize');
const token = require('../utilis/getUserIdByJwt');



// Fonction READ
exports.getCommentsByPost = (req, res) => {
    Comment.findAll({ where: { postId: req.params.postId } })
        .then(comments => res.status(200).json({ comments }))
        .catch(error => res.status(500).json({ error }));
};

exports.getAllComments = (req,res) => {
    Comment.findAll({
        include: [
            {
                model: Post,
                attributes: ['content'],
                order: [['createdAt', 'DESC']]
            },
        ],        
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => {res.status(500).json({message: 'Erreur de requête'})
    })
}

// Fonction CREATE
exports.newComment = (req, res) => {
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
    Comment.create(comment)
        .then(() => 
        res.status(201).json({ message: 'Commentaire enregistré' }))
        .catch(error => res.status(400).json({ error }));
};

// Fonction UPDATE
exports.updateComment = (req, res) => {
    console.log(req.body);
    if (!req.body.content) {
        return res.status(400).json({ error: 'Aucun contenu' });
    }

    Comment.update({ content: req.body.content }, {
        where: { id: req.params.id }
    })
        .then(() => res.status(200).json({ message: 'Commentaire modifié' }))
        .catch(error => res.status(500).json({ error }));
};

// Fonction DELETE
exports.deleteComment = (req, res) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
        .catch(error => res.status(500).json({ error }));
};




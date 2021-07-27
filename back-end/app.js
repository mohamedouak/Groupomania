const express = require('express');
const helmet = require('helmet');
const Seq = require('./sequelize');
const bodyParser = require ('body-parser');

const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/post');
const commentsRoutes = require('./routes/comment')

const app = express();

//Fonction middleware qui reçoit et gère la requête et la réponse
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //Renvoie vers le prochain middleware
  next();
});

app.use('/images', express.static('images'))
app.use(express.json());
app.use(helmet());

// Implémentations des routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

module.exports = app;
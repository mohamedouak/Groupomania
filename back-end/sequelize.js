const {Sequelize} = require('sequelize')
const UserModel = require('./models/user')
const CommentModel = require('./models/comment')
const PostModel = require('./models/post')

const sequelize = new Sequelize('mysql://root:@localhost:3306/groupomania') // Example for postgres

sequelize
  .authenticate()
  .then(() => console.log('Connexion à MySQL réussie !'))
  .catch(() => console.log('Connexion à MySQL échouée !'));

const User = UserModel(sequelize);
const Comment = CommentModel(sequelize)
const Post = PostModel(sequelize)

Comment.belongsTo(User);
Post.belongsTo(User);
Comment.belongsTo(Post);

// sequelize.sync()
sequelize.sync({ alter: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Comment,
  Post
};


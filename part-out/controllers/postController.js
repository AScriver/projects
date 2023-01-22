const db = require('../models');

module.exports = {
  createPost: function(req, res) {
    db.Post.create({
      title: req.body.title,
      desc: req.body.desc,
      itemImg: req.body.itemImg,
      price: req.body.price,
      carYear: req.body.carYear,
      carMake: req.body.carMake,
      carModel: req.body.carModel,
      location: req.body.location,
      category: req.body.category,
      UserId: req.user.id
    })
      .then(dbModel => res.json('/'))
      .catch(err => res.status(422).json(err));
  },
  getAllPosts: function(req, res) {
    db.Post.findAll({
      include: [db.User],
      order: [['id', 'DESC']]
    })
      .then(dbPost => res.json(dbPost))
      .catch(err => res.status(422).json(err));
  },
  getPostsById: function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.User
        },
        {
          model: db.Comment
        }
      ],
      order: [[db.Comment, 'id', 'DESC']]
    })
      .then(dbPost => res.json(dbPost))
      .catch(err => res.json(err));
  },
  submitComment: function(req, res) {
    db.Comment.create({
      user: req.body.user,
      userid: req.body.userid,
      comment: req.body.comment,
      PostId: req.body.PostId
    })
      .then(dbComment => {
        res.json(dbComment);
      })
      .catch(err => console.log(err));
  },
  deleteComment: function(req, res) {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbComment => res.json(dbComment))
      .catch(err => console.log(err));
  },
  deletePost: function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPost => res.json(dbPost))
      .catch(err => console.log(err));
  }
};

const db = require('../models');
const passport = require('../config/passport');
const multer = require('multer');
const path = require('path');
var isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = {
  createUser: function(req, res) {
    db.User.create(req.body)
      .then(dbModel => res.json('/login'))
      .catch(err => res.status(422).json(err));
  },
  userLogin: function(req, res) {
    if (req.isAuthenticated()) {
      res.json(req.user);
    }
  },
  userInfo: function(req, res) {
    db.User.findOne({
      where: { id: req.params.id },
      include: [{ model: db.Post }]
    })
      .then(dbUser => {
        db.Comment.findAll({ where: { UserId: req.params.id } })
          .then(dbComment => {
            res.json({ user: dbUser, comments: dbComment });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },
  allUsers: function(req, res) {
    db.User.findAll()
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => console.log(err));
  },
  updateUserStatus: function(req, res) {
    db.User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(dbUser => {
      res.json(dbUser);
    });
  }
};

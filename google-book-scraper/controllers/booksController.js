const axios = require("axios")
const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Book.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    let search = req.params.search.trim();
    console.log(search)
    let results = [];
    console.log(results);
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=" + search)
      .then(function(result) {
        console.log(result)
        console.log("ayylmao")
        result.data.items.forEach(book => {
          let bookObj = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            link: book.volumeInfo.infoLink,
            img: book.volumeInfo.smallThumbnail
          }
          results.push(bookObj);
        })
      });
      
  },
  remove: function(req, res) {
    db.Book.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findSaved: function(req, res) {
    db.Book.find({ saved: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Book.find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => console.log(err));
  }
};

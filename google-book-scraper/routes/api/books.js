const router = require("express").Router();
const booksController = require("../../controllers/booksController");

router
  .route("/:search")
  .get(booksController.findAll)
  .post(booksController.create)
  .put(booksController.update)
  .delete(booksController.remove);

router
  .route("/saved/:id")
  .get(booksController.findSaved);

module.exports = router;

// /api/books (get)
// /api/books (post)
// api/books/:id (delete)

// https://www.googleapis.com/books/v1/volumes/mKfDFa8r3pYC

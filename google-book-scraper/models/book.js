const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false
  }
});

// Custom method "save"
bookSchema.methods.saveBook = function() {
  // Changes the save state of the clicked book to "true"
  this.saved = true;
  // return the new value 
  return this.saved;
}

// Does the same thing as the method above, but unsaves the book.
bookSchema.methods.unsaveBook = function() {
  this.saved = false;
  return this.saved;
}

// This creates our model from the above schema, using mongoose's model method
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.put("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  searchBook: function(bookData) {
    return axios.post("/api/books/" + bookData);
  },
  getSavedBooks: function(id) {
    return axios.get("/api/books/saved/" + id)
  }
};

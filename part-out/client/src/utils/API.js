import axios from 'axios';

export default {
  // Signup a new user
  signup: function(user) {
    return axios.post('/api/signup', user);
  },
  // Login existing user
  signin: function(user) {
    return axios.post('/api/login', user);
  },
  findUserById: function(id) {
    return axios.get('/api/user/' + id);
  },
  createPost: function(post) {
    return axios.post('/api/post', post);
  },
  getAllPosts: function(cancelToken) {
    return axios.get('/api/post', cancelToken);
  },
  getPostById: function(id) {
    return axios.get('/api/item/' + id);
  },
  submitComment: function(data) {
    return axios.post('/api/comments', data);
  },
  deleteComment: function(id) {
    return axios.delete('/api/comments/' + id);
  },
  deletePost: function(id) {
    return axios.delete('/api/post/' + id);
  },
  getAllUsers: function() {
    return axios.get('/api/user/');
  },
  updateUserStatus: function(id, data) {
    return axios.put('/api/user/' + id, data);
  }
};

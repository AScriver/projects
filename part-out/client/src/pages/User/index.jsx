import React, { Component } from 'react';
import PostContainer from '../../components/PostContainer';
import CommentContainer from '../../components/CommentContainer';
import UserContainer from '../../components/UserContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import API from '../../utils/API';
import './index.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user: {},
      comments: []
    };
  }

  componentDidMount() {
    this.loadUser(this.props.match.params.id);
  }

  loadUser = id => {
    API.findUserById(id)
      .then(res => {
        this.setState({
          user: res.data.user,
          posts: res.data.user.Posts,
          comments: res.data.comments
        });
      })
      .catch(err => console.log(err));
  };

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.id !== this.props.match.id) {
      this.loadUser(newProps.match.params.id);
    }
  }

  handleCommentDelete = id => {
    API.deleteComment(id)
      .then(res => this.loadUser())
      .catch(err => console.log(err));
  };

  handlePostDelete = id => {
    API.deletePost(id)
      .then(res => this.loadUser())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-4 user-data-container'>
              <div className='row'>
                <div className='col-12 text-center'>
                  <h2>{this.state.user.username}'s Posts</h2>
                </div>
              </div>
              <hr className='pb-4' />
              <div className='row'>
                <div className='col-12'>
                  {this.state.posts.length > 0 ? (
                    this.state.posts.map(post => (
                      <PostContainer
                        handledelete={this.handlePostDelete}
                        post={{ ...post, User: this.state.user }}
                        key={post.id}
                        check={this.props.id}
                      />
                    ))
                  ) : (
                    <h1>No Posts To Show!</h1>
                  )}
                </div>
              </div>
            </div>
            <div className='col-4 user-data-container'>
              <div className='row'>
                <div className='col-12 text-center'>
                  <h2>{this.state.user.username}'s Comments</h2>
                </div>
              </div>
              <hr className='pb-4' />
              <div className='row'>
                <div className='col-12'>
                  {this.state.comments.length > 0 ? (
                    this.state.comments.map(comments => (
                      <CommentContainer
                        verified={this.state.user.verified}
                        handledelete={this.handleCommentDelete}
                        check={this.props.id}
                        comment={comments}
                        className='hover-effect single-comment'
                        key={comments.id}
                      />
                    ))
                  ) : (
                    <h1>No Comments To Show!</h1>
                  )}
                </div>
              </div>
            </div>
            <div className='col-4 user-data-container'>
              <div className='row'>
                <div className='col-12 text-center'>
                  <h2>{this.state.user.username}'s Information</h2>
                </div>
              </div>
              <hr className='pb-4' />
              <div className='row'>
                <div className='col-12'>
                  <UserContainer user={this.state.user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    id: state.auth.id,
    email: state.auth.email,
    profileImg: state.auth.profileImg,
    verified: state.auth.verified
  };
};

export default withRouter(connect(mapStateToProps)(User));

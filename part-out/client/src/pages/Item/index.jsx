import React, { Component } from 'react';
import API from '../../utils/API';
import { withRouter } from 'react-router';
import UserContainer from '../../components/UserContainer';
import CommentContainer from '../../components/CommentContainer';
import { connect } from 'react-redux';
import { Input, FormBtn } from '../../components/Form';
import 'gestalt/dist/gestalt.css';
import moment from 'moment';
import './index.css';

// Use url to search through database and update accordingly
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
      users: {},
      comments: [],
      newComment: ''
    };
  }

  componentDidMount() {
    API.getPostById(this.props.match.params.id)
      .then(res => {
        this.setState({
          posts: res.data,
          users: res.data.User,
          comments: res.data.Comments
        });
      })
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.submitComment({
      user: this.props.username,
      userid: this.props.id,
      comment: this.state.newComment,
      PostId: this.props.match.params.id
    })
      .then(res => {
        this.setState({
          newComment: ''
        });
        this.componentDidMount();
      })
      .catch(err => console.log(err.response));
  };

  render() {
    return (
      <div>
        <div className='container-fluid '>
          <div className='row'>
            <div className='col-lg-6 col-md-8 col-sm-10 offset-lg-3 offset-md-2 offset-sm-1 item-container p-4'>
              <div className='row'>
                <div className='col-12'>
                  <p className='post-title'>{this.state.posts.title}</p>
                </div>
              </div>
              <hr className='pb-4' />
              <div className='row'>
                <div
                  className='col-6 postImg'
                  style={{
                    backgroundImage: `url("${this.state.posts.itemImg}")`
                  }}
                />
                <div className='col-6'>
                  <div className='row item-tagscontainer'>
                    <div className='col-12 mb-4'>
                      <UserContainer user={this.state.users} />
                    </div>
                    <div className='col-12'>
                      <p>
                        <span className='tags'>Posted: </span>
                        {moment(this.state.posts.createdAt).fromNow()}
                      </p>
                    </div>
                    <div className='col-12'>
                      <p>
                        <span className='tags'>Price: </span>$
                        {this.state.posts.price}
                      </p>
                    </div>
                    <div className='col-12'>
                      <p>
                        <span className='tags'>Make: </span>
                        {this.state.posts.carMake}
                      </p>
                    </div>
                    <div className='col-12'>
                      <p>
                        <span className='tags'>Model: </span>
                        {this.state.posts.carModel}
                      </p>
                    </div>
                    <div className='col-12'>
                      <p>
                        <span className='tags'>Year: </span>
                        {this.state.posts.carYear}
                      </p>
                    </div>
                    <div className='col-12'>
                      <p>
                        <span className='tags'>Location: </span>
                        {this.state.posts.location}
                      </p>
                    </div>
                    <div className='col-12'>
                      <p>
                        <span className='tags'>Category: </span>
                        {this.state.posts.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className='mb-4 mt-4' />
              <p className='pb-0'>Leave A Comment:</p>
              <div className='row'>
                <div className='col-10'>
                  <Input
                    value={this.state.newComment}
                    onChange={this.handleInputChange}
                    name='newComment'
                    type='text'
                    autoComplete='false'
                    placeholder='Hopefully Something Nice...'
                    required
                  />
                </div>
                <div className='col-2'>
                  <FormBtn
                    className='button button-block'
                    disabled={!this.state.newComment}
                    onClick={this.handleFormSubmit}
                  >
                    Submit
                  </FormBtn>
                </div>
              </div>
              <div className='row'>
                {this.state.comments.map(comment => (
                  <div className='col-12 pb-2' key={comment.id}>
                    <CommentContainer comment={comment} />
                    <hr className='mt-2' />
                  </div>
                ))}
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
    id: state.auth.id,
    username: state.auth.username
  };
};

export default withRouter(connect(mapStateToProps)(Item));

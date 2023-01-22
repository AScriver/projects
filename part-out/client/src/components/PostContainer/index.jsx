import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IconButton } from 'gestalt';
import moment from 'moment';

class PostContainer extends Component {
  render() {
    return (
      <div className='row hover-effect no-gutters pb-0 mb-3'>
        <div
          className='col-3 postImg'
          style={{ backgroundImage: `url("${this.props.post.itemImg}")` }}
        />

        <div className='userpost col-9 d-flex align-content-around flex-column'>
          <h3 className='mb-auto text-center'>
            <Link to={`/item/${this.props.post.id}`}>
              {this.props.post.title} - {this.props.post.category}
            </Link>
          </h3>
          <hr />
          <div className='row'>
            <div className='col-10'>
              <p className='my-auto mx-3'>
                <span className='postLabel'>
                  Posted By:{' '}
                  <Link to={`/user/${this.props.post.User.id}`}>
                    {this.props.post.User.username}
                  </Link>
                </span>{' '}
                - {moment(this.props.post.createdAt).fromNow()}
              </p>
              <h6 className='my-auto mx-3'>
                <span className='postLabel'>Location: </span>
                {this.props.post.location}
              </h6>

              <div className='row no-gutters mx-3 mb-0'>
                <div className='col-12 my-auto'>
                  <p className='mb-0'>
                    <span className='postLabel'>Price: </span>$
                    {this.props.post.price}
                  </p>
                </div>
                <div className='row'>
                  <div className='col-12 my-auto'>
                    <p className='mb-0'>
                      <span className='postLabel'>Fits: </span>
                      {this.props.post.carYear} {this.props.post.carMake}{' '}
                      {this.props.post.carModel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-2'>
              {(this.props.username === this.props.post.User.username &&
                this.props.id === this.props.check) ||
              this.props.permissions === 'admin' ? (
                <div className='ml-auto'>
                  <IconButton
                    accessibilityLabel='Delete'
                    icon='cancel'
                    onClick={() => this.props.handledelete(this.props.post.id)}
                  />
                </div>
              ) : (
                ''
              )}
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
    username: state.auth.username,
    permissions: state.auth.permissions
  };
};

export default withRouter(connect(mapStateToProps)(PostContainer));

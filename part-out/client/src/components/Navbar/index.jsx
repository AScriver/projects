import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutReq } from '../../state/auth/actions';
import UserContainer from '../UserContainer';

// These look really hacky, but they're just used to show/hide nav links depending
// on whether or not a user is logged in.

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className='navbar fixed-top navbar-expand navbar-light bg-light'>
          <Link to='/' className='navbar-brand'>
            {' '}
            PartOut{' '}
          </Link>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav nav-pills nav-fill'>
              {this.props.permissions === 'admin' ? (
                <li className='nav-item'>
                  <Link to='/admin' className='nav-link'>
                    Admin
                  </Link>
                </li>
              ) : (
                ''
              )}
            </ul>
            <ul className='navbar-nav nav-pills nav-fill ml-auto'>
              {this.props.username ? (
                <li className='nav-item'>
                  <Link to='/submit' className='nav-link mt-1'>
                    Submit
                  </Link>
                </li>
              ) : (
                ''
              )}
              {this.props.username ? (
                <li className='nav-item'>
                  <Link
                    to='/'
                    onClick={() => this.props.logoutButton()}
                    className='nav-link mt-1'
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>
                    Login
                  </Link>
                </li>
              )}
              {this.props.username ? (
                ''
              ) : (
                <li className='nav-item'>
                  <Link to='/signup' className='nav-link'>
                    Signup
                  </Link>
                </li>
              )}
              {this.props.username ? (
                <li className='nav-item ml-2'>
                  <UserContainer user={this.props} />
                </li>
              ) : (
                ''
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.id,
    username: state.auth.username,
    createdAt: state.auth.createdAt,
    updatedAt: state.auth.updatedAt,
    permissions: state.auth.permissions,
    verified: state.auth.verified
  };
};

function mapDispatchToProps(dispatch) {
  return {
    logoutButton() {
      dispatch(signoutReq());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

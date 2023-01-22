import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, FormBtn } from '../../components/Form';
import API from '../../utils/API';
import { signinReq, signoutReq } from '../../state/auth/actions';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './index.css';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      authenticated: null,
      email: '',
      profileImg: '',
      err: ''
    };
  }

  componentWillUnmount() {}

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.signin({
      username: this.state.username,
      password: this.state.password
    })
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            authenticated: true,
            username: resp.data.username,
            email: resp.data.email,
            id: resp.data.id,
            profileImg: resp.data.profileImg,
            createdAt: resp.data.createdAt,
            updatedAt: resp.data.updatedAt,
            verified: resp.data.verified,
            permissions: resp.data.permissions,
            status: resp.data.status
          });

          this.props.signin(
            this.state.username,
            this.state.authenticated,
            this.state.email,
            this.state.profileImg,
            this.state.id,
            this.state.createdAt,
            this.state.updatedAt,
            this.state.verified,
            this.state.permissions,
            this.state.status
          );

          const { history } = this.props;
          history.push('/');
        } else {
          this.setState({
            err: 'Incorrect Username or Password!'
          });
        }
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          err: 'Incorrect Username or Password!'
        });
      });
  };

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-8 offset-2'>
            <div className='sidebar-container mb-4'>
              <div id='login'>
                <h1>Welcome Back!</h1>

                <form className='login'>
                  <div className='field-wrap'>
                    <Input
                      value={this.state.username}
                      onChange={this.handleInputChange}
                      name='username'
                      type='text'
                      placeholder='Username (Required)'
                      required
                    />
                  </div>

                  <div className='field-wrap'>
                    <Input
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      name='password'
                      type='password'
                      placeholder='Password (Required)'
                      autoComplete='false'
                      required
                    />
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                      <p className='no-acc'>
                        <Link to='/signup'>Don't have an account?</Link>
                      </p>
                    </div>
                    <div className='col-6 '>
                      <p className='forgot'>
                        <Link to='/'>Forgot Password?</Link>
                      </p>
                    </div>
                  </div>

                  <FormBtn
                    className='button button-block mb-6'
                    disabled={!(this.state.password && this.state.username)}
                    onClick={this.handleFormSubmit}
                  >
                    Login
                  </FormBtn>
                </form>
              </div>
            </div>
          </div>
        </div>
        {this.state.err ? (
          <div className='row mt-0'>
            <div className='col-8 offset-2'>
              <div id='alert' className='alert alert-danger mt-0' role='alert'>
                <span className='fas fa-exclamation' aria-hidden='true' />
                <span className='sr-only'>Error:</span>
                <span className='msg'>&nbsp;{this.state.err}</span>
              </div>
            </div>
          </div>
        ) : (
          ' '
        )}
      </div>
    );
  }
}

// these need to some from the server somehow
// authenticated is props.authenticated
//gets store
const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

// updates store
function mapDispatchToProps(dispatch) {
  return {
    signin(
      username,
      authenticated,
      email,
      profileImg,
      id,
      createdAt,
      updatedAt,
      verified,
      permissions,
      status
    ) {
      dispatch(
        signinReq({
          username: username,
          authenticated: authenticated,
          email: email,
          profileImg: profileImg,
          id: id,
          createdAt: createdAt,
          updatedAt: updatedAt,
          verified: verified,
          permissions: permissions,
          status: status
        })
      );
    },
    logoutButton() {
      dispatch(signoutReq());
    }
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LogIn)
);

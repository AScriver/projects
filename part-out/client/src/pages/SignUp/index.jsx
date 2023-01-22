import React, { Component } from 'react';
import "./index.css";
import API from '../../utils/API';
import { Input, FormBtn } from "../../components/Form";
import { withRouter } from 'react-router'
import { Link } from "react-router-dom";

class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    confirm: "",
    redirect: "",
    err: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.password !== this.state.confirm) {
      this.setState({ err: "Passwords do not match!" });
    }

    API.signup({
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }).then(resp => {
      const { history } = this.props;
      history.push(resp.data)
    }).catch(error => {
      if (error.response) {
        console.log(error.response);
        this.setState({
          err: error.response.data.errors[0].path
        })
        console.log(this.state.err)
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }

  render() {
    return (
      <div>
      <div className="form">
        <div id="signup">
          <h1>Create an Account</h1>

          <form className='signup'>

            <div className="field-wrap">
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                type="email"
                name="email"
                placeholder="Email (Required)"
                required
              />
            </div>

            <div className="field-wrap">
              <Input
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                type="text"
                placeholder="Username (Required)"
                required
              />
            </div>

            <div className="field-wrap">
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                type="password"
                placeholder="Password (Required)"
                autoComplete="false"
                required
              />
            </div>

            <div className="field-wrap">
              <Input
                value={this.state.confirm}
                onChange={this.handleInputChange}
                name="confirm"
                type="password"
                placeholder="Confirm Password (Required)"
                autoComplete="false"
                required
              />
            </div>
            <div className="row">
              <div className="col-12">
                <p className="no-acc">
                  <Link to='/login'>I Already Have An Account!</Link>
                </p>
              </div>
            </div>


            {/* <button type="submit" className="button button-block">Get Started</button> */}
            <FormBtn
              className="button button-block"
              disabled={!(this.state.email && this.state.password && this.state.username)}
              onClick={this.handleFormSubmit}
            >Sign Up</FormBtn>
          </form>

        </div>
      </div>
      <div>
        {this.state.err ? (
          <div className="row mt-0">
            <div className="col-8 offset-2">
              <div id="alert" className="alert alert-danger mt-0" role="alert">
                <span
                  className="fas fa-exclamation"
                  aria-hidden="true"
                />
                <span className="sr-only">Error:</span>

                <span className="msg">&nbsp; {this.state.err === "email" ? "Email is already in use!" : this.state.err === "username" ? "Username is already in use!" : " "}</span>
              </div>
            </div>
          </div>
        ) : (
            " "
          )}
      </div>
      </div>
    )
  }
}

export default withRouter(SignUp);



// may have to extend other components to check for logged in user. if (logged in user) {send logged in user compatable comp}
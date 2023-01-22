import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RequireAuth = ComposedComponent => {
  class Authentication extends React.Component {
    static contextTypes = {
      router: PropTypes.object
    };

    // Check before components
    componentWillMount() {
      this.userCheck();
    }

    // Compare new props coming in
    componentWillUpdate(nextProps) {
      this.userCheck();
    }

    userCheck = () => {
      if (this.props.status === 'banned') {
        this.context.router.history.push('/banned');
      }
      if (!this.props.authenticated) {
        this.context.router.history.push('/login');
      }
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated,
      username: state.auth.username,
      permissions: state.auth.permissions,
      status: state.auth.status,
      id: state.auth.id
    };
  };

  return connect(
    mapStateToProps,
    null
  )(Authentication);
};

export default RequireAuth;

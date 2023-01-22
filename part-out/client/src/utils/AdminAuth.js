import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AdminAuth = ComposedComponent => {
  class Authentication extends React.Component {
    static contextTypes = {
      router: PropTypes.object
    };

    // Check before components
    componentWillMount() {
      if (this.props.permissions !== 'admin') {
        this.context.router.history.push('/');
      }
    }

    // Compare new props coming in
    componentWillUpdate(nextProps) {
      if (this.props.permissions !== 'admin') {
        this.context.router.history.push('/');
      }
    }

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

export default AdminAuth;

import React, { Component } from 'react';
import API from '../../utils/API';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      users: [],
      comments: []
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    API.getAllUsers()
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => console.log(err));
  };

  userBan = (id, status) => {
    API.updateUserStatus(id, {
      status: status
    }).then(res => console.log(res));
  };

  render() {
    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-8 offset-2'>
              <table className='table table-dark table-sm'>
                <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Username</th>
                    <th scope='col'>Image</th>
                    <th scope='col'>Verified</th>
                    <th scope='col'>Permissions</th>
                    <th scope='col'>Created</th>
                    <th scope='col'>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map(user => (
                    <tr key={user.id}>
                      <th scope='row'>{user.id}</th>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.profileImg}</td>
                      <td>{user.verified ? 'true' : 'false'}</td>
                      <td>{user.permissions}</td>
                      <td>{user.createdAt}</td>
                      <td>{user.updatedAt}</td>
                      <td>
                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() => this.userBan(user.id, 'banned')}
                        >
                          Temp Ban
                        </button>
                      </td>
                      <td>
                        <button
                          className='btn btn-success btn-sm'
                          onClick={() => this.userBan(user.id, 'okay')}
                        >
                          Unban
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='col-4' />
            <div className='col-4' />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(Test));

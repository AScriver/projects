import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../utils/API';
import PostContainer from '../../components/PostContainer';
import { withRouter } from 'react-router';
import axios from 'axios';
import './index.css';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      carMake: '',
      carModel: '',
      carYear: '',
      category: 'Select A Category...'
    };
    this.signal = axios.CancelToken.source();
  }

  componentDidMount() {
    API.getAllPosts({
      cancelToken: this.signal.token
    })
      .then(resp => {
        this.setState({
          posts: resp.data
        });
      })
      .catch(function(error) {
        if (axios.isCancel(error)) {
          console.log('Error: ', error.message);
        } else {
          console.log(error);
        }
      });
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log('Form Submitted');
  };

  render() {
    const { carMake, carModel, carYear, category, posts } = this.state;

    const filterMake = posts.filter(
      post => post.carMake.toLowerCase().indexOf(carMake.toLowerCase()) !== -1
    );
    const filterModel = posts.filter(
      post => post.carModel.toLowerCase().indexOf(carModel.toLowerCase()) !== -1
    );
    const filterYear = posts.filter(
      post => post.carYear.toString().indexOf(carYear.toString()) !== -1
    );
    const filterCategory = posts.filter(
      post => post.category.toLowerCase().indexOf(category.toLowerCase()) !== -1
    );

    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-2'>
              <Sidebar
                carMake={carMake}
                carModel={carModel}
                carYear={carYear}
                category={category}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={event => {
                  event.preventDefault();
                  this.handleFormSubmit(event);
                }}
              />
            </div>
            <div className='col-8 offset-1'>
              {carMake && carModel && carYear && category
                ? filterCategory.map(post => (
                    <PostContainer post={post} key={post.id} />
                  ))
                : carMake && carModel && carYear
                ? filterYear.map(post => (
                    <PostContainer post={post} key={post.id} />
                  ))
                : carMake && carModel
                ? filterModel.map(post => (
                    <PostContainer post={post} key={post.id} />
                  ))
                : carMake
                ? filterMake.map(post => (
                    <PostContainer post={post} key={post.id} />
                  ))
                : posts.map(post => (
                    <PostContainer post={post} key={post.id} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Posts);

import React, { Component } from 'react';

class Test extends Component {
  state = {
    title: '',
    body: ''
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          body: data.body
        });
      });
  }

  //   // Depricated
  //   componentWillMount() {
  //     console.log('componentWillMount...');
  //   }

  //   componentDidUpdate() {
  //     console.log('componentDidUpdate...');
  //   }

  //   // Depricated
  //   componentWillUpdate() {
  //     console.log('componentWillUpdate...');
  //   }

  //   // Depricated
  //   componentWillReceiveProps(nestProps, nextState) {
  //     console.log('componentWillReceiveProps...');
  //   }

  //   // Instead of setState, this method returns state
  //   static getDerivedStateFromProps(nextProps, prevState) {
  //     return {
  //       test: 'something'
  //     };
  //   }

  //   getSnapshotBeforeUpdate(prevProps, prevState) {
  //     console.log('getSnapshotBeforeUpdate');
  //   }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default Test;

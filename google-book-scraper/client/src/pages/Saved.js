import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { SavedBook } from "../components/Book";
// import { Link } from "react-router-dom";

class Saved extends Component {
  state = {
    books: [], // -> Use array so we can map over it.
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    API.getBook({saved: true})
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron />
          <Row>
            <Col size="8">
              {this.state.books.map(book => 
                <SavedBook books={book}/>
              )}
            </Col>
          </Row>
      </Container>
    );
  }
}

export default Saved;

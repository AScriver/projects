import React, { Component } from "react";
import { Input, FormBtn, TextArea, DropDown } from "../../components/Form";
import "./index.css";
import API from "../../utils/API";
import {withRouter} from 'react-router'

class Submit extends Component {
  state = {
    title: '',
    desc: '',
    itemImg: '',
    price: 0,
    carYear: 0,
    carMake: '',
    carModel: '',
    location: '',
    category: ''
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  
  handleFormSubmit = event => {
    event.preventDefault();
    API.createPost({
      title: this.state.title,
      desc: this.state.desc,
      itemImg: this.state.itemImg,
      price: this.state.price,
      carYear: this.state.carYear,
      carMake: this.state.carMake,
      carModel: this.state.carModel,
      location: this.state.location,
      category: this.state.category
    }).then(resp => {
      const {history} = this.props;
        history.push('/')
    }).catch(function (error) {
      console.log(error.response);
    });
  }

  render() {
    return (
      <div>
        <div className="form">
          <div className="form-wrap">
            <form className="create-form">
              <div className="form-group">
                <div className="field-wrap">
                <p>Post Title:</p>
                  <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    type="text"
                    placeholder="Post Title"
                    id="title"
                    required
                  />
                </div>
                <p>Post Description:</p>
                <div className="field-wrap">
                  <TextArea
                    value={this.state.desc}
                    onChange={this.handleInputChange}
                    name="desc"
                    type="text"
                    placeholder="Item Description..."
                    id="desc"
                    required
                  />
                </div>
                <p>Image Link:</p>
                <div className="field-wrap">
                  <Input
                    value={this.state.itemImg}
                    onChange={this.handleInputChange}
                    name="itemImg"
                    type="text"
                    placeholder="Image Link"
                    id="itemImg"
                    required
                  />
                </div>
                <p>Asking Price: </p>
                <div className="field-wrap">
                  <Input
                    value={this.state.price}
                    onChange={this.handleInputChange}
                    name="price"
                    type="number"
                    placeholder="Price"
                    id="price"
                    min="1"
                    max="100000"
                    required
                  />
                </div>
                <p>Car Year: </p>
                <div className="field-wrap">
                  <Input
                    value={this.state.carYear}
                    onChange={this.handleInputChange}
                    name="carYear"
                    type="number"
                    placeholder="Year"
                    id="carYear"
                    min="1900"
                    max="2025"
                    required
                  />
                </div>
                <p>Car Make: </p>
                <div className="field-wrap">
                  <Input
                    value={this.state.carMake}
                    onChange={this.handleInputChange}
                    name="carMake"
                    type="text"
                    placeholder="Manufacturer"
                    id="carMake"
                    required
                  />
                </div>
                <p>Car Model: </p>
                <div className="field-wrap">
                  <Input
                    value={this.state.carModel}
                    onChange={this.handleInputChange}
                    name="carModel"
                    type="text"
                    placeholder="Model"
                    id="carModel"
                    required
                  />
                </div>
                <p>Location: </p>
                <div className="field-wrap">
                  <Input
                    value={this.state.location}
                    onChange={this.handleInputChange}
                    name="location"
                    type="text"
                    placeholder="Location"
                    id="location"
                    required
                  />
                </div>
                <p>Category: </p>
                <div className="field-wrap">
                  <DropDown
                    value={this.state.category}
                    onChange={this.handleInputChange}
                    name="category"
                    type="text"
                    id="category"
                  >
                    <option disabled>Select a category</option>
                    <option>Brakes</option>
                    <option>Drivetrain</option>
                    <option>Engine</option>
                    <option>Exhaust</option>
                    <option>Exterior</option>
                    <option>Intake</option>
                    <option>Interior</option>
                    <option>Lights</option>
                    <option>Suspension</option>
                    <option>Wheels & Tires</option>
                  </DropDown>
                </div>
              </div>
              <FormBtn
                type="submit"
                disabled={!(this.state.title && this.state.desc && this.state.itemImg && this.state.price && this.state.carYear && this.state.carMake && this.state.carModel && this.state.location && this.state.category)}
                className="button button-block"
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Submit);

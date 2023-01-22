import React, { Component } from "react";
import Sidebar from "../../../components/Sidebar";
import API from "../../../utils/API";
import PostContainer from "../../../components/PostContainer"
import { withRouter } from 'react-router'
import axios from 'axios';

class CarMake extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            carMake: "",
            carModel: "",
            carYear: "",
            isLoading: false
        };
        this.signal = axios.CancelToken.source();
    }

    componentDidMount() {
        API.getPostByMakeModelYear(carMake, carModel, carYear, {
            cancelToken: this.signal.token,
          })
            .then(resp => {
              this.setState({
                posts: resp.data,
                isLoading: true
              })
            })
            .catch(function (error) {
              if (axios.isCancel(error)) {
                console.log('Error: ', error.message); // => prints: Api is being canceled
              } else {
                this.setState({ isLoading: false });
              }
            });
    }

    componentWillUnmount() {
        this.signal.cancel('Api is being canceled')
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { carMake, carModel, carYear } = this.state;
        const { history } = this.props
        if (carMake && carModel && carYear) {
            history.push('/search/' + carMake + '/' + carModel + '/' + carYear)
        } else if (carMake && carModel) {
            history.push('/search/' + carMake + '/' + carModel)
        } else if (carMake) {
            history.push('/search/' + carMake)
        } else {
            history.push('/')
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2">
                            <Sidebar
                                carMake={this.state.carMake}
                                carModel={this.state.carModel}
                                carYear={this.state.carYear}
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={(event) => {
                                    event.preventDefault()
                                    this.handleFormSubmit(event);
                                }}
                            />
                        </div>
                        <div className="col-8 offset-1">
                            {this.state.posts.map(post => (
                                <PostContainer post={post} key={post.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CarMake);
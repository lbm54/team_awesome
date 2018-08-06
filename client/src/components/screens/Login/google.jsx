import React, { Component, Fragment } from "react";
import {googleLogin} from '../../../services/user';

class Google extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    let token = this.props.match.params.token; 
    googleLogin(token);
    this.props.history.push('/');
  }

  

  render() {
    return <h1>Got here?</h1>
  }

    
}

export default Google;

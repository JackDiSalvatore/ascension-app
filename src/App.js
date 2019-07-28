import React, { Component } from 'react';
import {connect} from 'react-redux';

import Home from './pages/home'

class App extends Component{
  // componentDidMount() {
  //     this.props.dispatch(attemptAutoLogin());
  // }

  render(){
    return (
      <Home/>
    );
  }
}

export default connect()(App);

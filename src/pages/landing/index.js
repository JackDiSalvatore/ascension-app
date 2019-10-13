import React, { Component } from 'react';


import './landing.css';

// Actions


// Components

// Styles

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    // width: '75%',
    // margin: '1% auto 1% auto',
    // border: '1mm solid rgba(174, 223, 212, .6)'
  },
});


class Landing extends Component{
  constructor(props){
    super(props);

  };

  componentDidMount() {
    // Default Account

  }

  render(){
    const { classes } = this.props;

    return (
      <div className="Landing">           

        {/* <SearchAppBar
          getAccountDetails={this.getAccountDetails.bind(this)}
          loggedIn={loggedIn}
          loginUser={loginUser.bind(this)}
          logOutUser={logOutUser.bind(this)}
          userAccount={userAccount}
        /> */}
            
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

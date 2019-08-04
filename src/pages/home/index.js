import React, { Component } from 'react';
import {connect } from 'react-redux';
import { JsonRpc } from 'eosjs';

import './home.css';

// Actions
import {
  requestLogin,
  fetchWallet,
  logout,
  sendTokens
} from '../../scatter/scatter_actions';

import { SetActionHistoryAction } from '../../actions/SetActionHistoryAction';
import { SetEndpointAction } from '../../actions/SetEndpointAction';
import { SetAccountAction } from '../../actions/SetAccountAction';
import { SetREXBalanceAction } from '../../actions/SetREXBalanceAction';
import { SetdelbandAction } from '../../actions/SetdelbandAction';

// Components
import AccountDetails from '../../components/AccountDetails/AccountDetails';
import SearchAppBar from '../../components/SearchAppBar/SearchAppBar';
import ActionHistory from '../../components/ActionHistory/ActionHistory';


class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      scatterConnected: false,
      requestedAuth: false,
      connectingScatter: false,
      requestedTransaction: false,
      connectedNetworkName: null,

      // scatter account details
      loggedIn: false,
      userAccount: {
        name: null,
        publicKey: null,
        keyType: null,
      },
      userWallet: {}
    };

  };

  loginUser = () => {
    this.props.login()
  }

  logOutUser = () => {
    this.props.logout()
  } 

  // sendTokens = ({toAccount,amount,memo}) => {
  //   this.props.dispatch(sendTokens({toAccount,amount,memo}))
  // };

  static getDerivedStateFromProps(props){
    const
      hasWalletOrError = props.scatter.userWallet || props.scatter.walletError,
      shouldFetchWallet = props.scatter.loggedIn && !(hasWalletOrError || props.scatter.fetchingWallet);

      shouldFetchWallet && props.setFetchWallet()
      return null;
  }

  async getAccountDetails(accountName) {
    const rpc = new JsonRpc(this.props.endpoint, { fetch });
    console.log('Account Name is ' + accountName);
    
    try {
      rpc.get_account(accountName).then(result => {
        this.setState({accountInfo: result})
        // CALL ACTION
        this.props.setUser(result)
      });

      // get bandwidth delegated to other accounts
      rpc.get_table_rows({
        json: true,
        code: 'eosio',                // contract who owns the table
        scope: accountName,               // scope of the table
        table: 'delband',              // name of the table as specified by the contract abi
        limit: 100000,                    // Here we limit to 1 to get only the
        reverse: false,               // Optional: Get reversed data
        show_payer: false,            // Optional: Show ram payer
      }).then(result => {
        this.setState({ delband: result.rows })
        // CALL ACTION
        this.props.setdelbandAction(result.rows)
      });
        
      // get rex balance
      rpc.get_table_rows({
        json: true,
        code: 'eosio',                // contract who owns the table
        scope: 'eosio',               // scope of the table
        table: 'rexbal',              // name of the table as specified by the contract abi
        lower_bound: accountName,
        limit: 1,                     // Here we limit to 1 to get only the
        reverse: false,               // Optional: Get reversed data
        show_payer: false,            // Optional: Show ram payer
      }).then(result => {
        this.setState({ rexBalance: result.rows[0] })
        // CALL ACTION
        this.props.setREXBalance(result.rows[0])
      });
    } catch (error) {
      console.log(error);
    }

    // json: true,
    // pos: '-1',
    // offset: '-20',
    // account_name: 'eosio'

    // get action history
    rpc.history_get_actions(accountName).then(result => {
      //console.log(result.actions)
      this.setState({ actionHistory: result.actions})
      // CALL ACTION
      this.props.setActionHistory(result.actions)
    })
  }

  componentDidMount() {
    // Default Account
    this.getAccountDetails('wizznetwork1');
  }

  render(){
    const { userAccount, loggedIn, userWallet} = this.props.scatter;
    const { accountInfo, actionHistory, delband, rexBalance } = this.props;

    const {
      loginUser,
      sendTokens,
      logOutUser
    } = this;


    return (
      <div className="Home">           

        <SearchAppBar
          getAccountDetails={this.getAccountDetails.bind(this)}
          loggedIn={loggedIn}
          loginUser={loginUser.bind(this)}
          logOutUser={logOutUser.bind(this)}
          userAccount={userAccount}
        />

        <AccountDetails
          accountInfo={accountInfo}
          delband={delband}
          rexBalance={rexBalance}
        />

        <ActionHistory actionHistory={actionHistory}/>
            
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Scatter
    scatter: state.scatter,
    // Endpoint
    endpoint: state.endpoint,
    // Account Search
    actionHistory: state.actionHistory,
    accountInfo: state.accountInfo,
    rexBalance: state.rexBalance,
    delband: state.delband,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Scatter
    login: () => { dispatch(requestLogin()) },
    logout: () => { dispatch(logout()) },
    setFetchWallet: () => { dispatch(fetchWallet()) },
    // Account Search
    setActionHistory: (actionHistory) => { dispatch(SetActionHistoryAction(actionHistory)) },
    setEndpoint: (endpoint) => { dispatch(SetEndpointAction(endpoint)) },
    setUser: (accountInfo) => { dispatch(SetAccountAction(accountInfo)) },
    setREXBalance: (rexBalance) => { dispatch(SetREXBalanceAction(rexBalance)) },
    setdelbandAction: (delband) => { dispatch(SetdelbandAction(delband)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

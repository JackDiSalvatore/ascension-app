import React, { Component } from 'react';
import {connect } from 'react-redux';
import { JsonRpc } from 'eosjs';

import './home.css';

import Grid from '@material-ui/core/Grid';

// Actions
import {
  requestLogin,
  fetchWallet,
  logout,
  sendTokens,
  createSmartAccount,
  removeSmartAccount,
  removeSmartAccountApprove,
  revertActivePermission,
  chestnutSendTokens,
  addtokenmax
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
import EOSActions from '../../components/EOSActions/EOSActions';


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

  sendTokens = ({to, amount, memo}) => {
    // console.log(toAccount + ' ' + amount + ' ' + memo);
    this.props.sendTokens({to, amount, memo})
  }

  createSmartAccount = () => {
    this.props.createSmartAccount()
  }

  removeSmartAccount = () => {
    this.props.removeSmartAccount()
  }

  removeSmartAccountApprove = () => {
    this.props.removeSmartAccountApprove()
  }

  revertActivePermission = () => {
    this.props.revertActivePermission()
  }

  chestnutSendTokens = ({to, amount, memo}) => {
    this.props.chestnutSendTokens({to, amount, memo})
  }

  addtokenmax = ({quantity, contract_account}) => {
    this.props.addtokenmax({quantity, contract_account})
  }

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
        scope: accountName,           // scope of the table
        table: 'delband',             // name of the table as specified by the contract abi
        limit: 10000000,              // Here we limit to 10 million
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
      this.setState({ actionHistory: result.actions })
      // CALL ACTION
      this.props.setActionHistory(result.actions)
    })
  }

  componentDidMount() {
    // Default Account
    this.getAccountDetails('jackchestnut');
  }

  render(){
    const { userAccount, loggedIn, userWallet} = this.props.scatter;
    const { accountInfo, actionHistory, delband, rexBalance } = this.props;

    const {
      loginUser,
      sendTokens,
      logOutUser,
      createSmartAccount,
      removeSmartAccount,
      removeSmartAccountApprove,
      revertActivePermission,
      chestnutSendTokens,
      addtokenmax
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

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >

            <AccountDetails
              accountInfo={accountInfo}
              delband={delband}
              rexBalance={rexBalance}
            />

            {
              loggedIn ?
              <EOSActions
                userAccount={userAccount}
                sendTokens={sendTokens}
                createSmartAccount={createSmartAccount}
                removeSmartAccount={removeSmartAccount}
                removeSmartAccountApprove={removeSmartAccountApprove}
                revertActivePermission={revertActivePermission}
                addtokenmax={addtokenmax}
                chestnutSendTokens={chestnutSendTokens}
              />
              :
              <div/>
            }

            <ActionHistory actionHistory={actionHistory}/>
          </Grid>
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
    // Transfer Tokens
    sendTokens: ({to, amount, memo}) => { dispatch(sendTokens({to, amount, memo})) },
    // Chestnut Creation
    createSmartAccount: () => { dispatch(createSmartAccount()) },
    removeSmartAccount: () => { dispatch(removeSmartAccount()) },
    removeSmartAccountApprove: () => { dispatch(removeSmartAccountApprove()) },
    revertActivePermission: () => { dispatch(revertActivePermission()) },
    // Chestnut Actions
    chestnutSendTokens: ({to, amount, memo}) => { dispatch(chestnutSendTokens({to, amount, memo})) },
    addtokenmax: ({quantity, contract_account}) => { dispatch(addtokenmax({quantity, contract_account})) },
    // Account Search
    setActionHistory: (actionHistory) => { dispatch(SetActionHistoryAction(actionHistory)) },
    setEndpoint: (endpoint) => { dispatch(SetEndpointAction(endpoint)) },
    setUser: (accountInfo) => { dispatch(SetAccountAction(accountInfo)) },
    setREXBalance: (rexBalance) => { dispatch(SetREXBalanceAction(rexBalance)) },
    setdelbandAction: (delband) => { dispatch(SetdelbandAction(delband)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

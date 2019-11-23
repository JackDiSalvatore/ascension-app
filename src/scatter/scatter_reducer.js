import {SCATTER_ACTIONS} from './scatter_actions';

const INITIAL_STATE = {
  connected       : false,
  connecting      : false,
  connectionError : false,

  loggedIn        : false,
  requestedLogIn  : false,
  loginFailed     : false,

  userAccount     : null,
  userWallet      : null,
  fetchingWallet  : false,
  walletError     : null,

  sendingTokens   : false,

  creatingSmartAccount : false,

  removingSmartAccount : false,
  removingSmartAccountApproved : false,
  revertingActivePermission: false,

  chestnutSendingTokens: false,

  addingWhitelist: false,
  addingTokenMax: false,
  addingXfrMax: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SCATTER_ACTIONS.CONNECT:
      return {...state, connecting: true,};

    case SCATTER_ACTIONS.CONNECTED:
      return {...state, connected: true, connectionError: false};

    case SCATTER_ACTIONS.CONNECTION_ERROR:
      return {...state, connectionError: true};

    case SCATTER_ACTIONS.LOGGED_IN:
      return {...state, loggedIn: true, loginFailed: false, userAccount: action.payload};

    case SCATTER_ACTIONS.GET_WALLET:
      return {...state, fetchingWallet: true, walletError: null};

    case SCATTER_ACTIONS.SET_WALLET:
      return {...state, fetchingWallet: false, walletError: null, userWallet: action.payload};

    case SCATTER_ACTIONS.GET_WALLET_ERROR:
      return {...state, fetchingWallet: false, walletError: action.payload.message};

    case SCATTER_ACTIONS.LOGGED_OUT:
      return {...state, loggedIn: false, loginFailed: false, userAccount: null, userWallet: null, walletError: null, fetchingWallet: false};

    case SCATTER_ACTIONS.SEND_TOKEN:
      return {...state, sendingTokens: true};

    case SCATTER_ACTIONS.SEND_TOKEN_SUCCESS:
      return {...state, sendingTokens: false};

    case SCATTER_ACTIONS.CREATE_SMART_ACCOUNT:
    return {...state, creatingSmartAccount: true};

    case SCATTER_ACTIONS.CREATE_SMART_ACCOUNT_SUCCESS:
      return {...state, creatingSmartAccount: false};

    case SCATTER_ACTIONS.REMOVE_SMART_ACCOUNT:
    return {...state, removingSmartAccount: true};

    case SCATTER_ACTIONS.REMOVE_SMART_ACCOUNT_SUCCESS:
    return {...state, removingSmartAccount: false};

    case SCATTER_ACTIONS.REMOVE_SMART_ACCOUNT_APPROVED:
    return {...state, removingSmartAccountApproved: true};

    case SCATTER_ACTIONS.REMOVE_SMART_ACCOUNT_APPROVED_SUCCESS:
    return {...state, removingSmartAccountApproved: false};

    case SCATTER_ACTIONS.REVERT_ACTIVE_PERMISSION:
    return {...state, revertingActivePermission: true};

    case SCATTER_ACTIONS.REVERT_ACTIVE_PERMISSION_SUCCESS:
    return {...state, revertingActivePermission: false};

    case SCATTER_ACTIONS.CHESTNUT_SEND_TOKENS:
    return {...state, chestnutSendingTokens: true};

    case SCATTER_ACTIONS.CHESTNUT_SEND_TOKENS_SUCCESS:
    return {...state, chestnutSendingTokens: false};

    case SCATTER_ACTIONS.CHESTNUT_ADD_WHITELIST:
    return {...state, addingWhitelist: true};

    case SCATTER_ACTIONS.CHESTNUT_ADD_WHITELIST_SUCCESS:
    return {...state, addingWhitelist: false};

    case SCATTER_ACTIONS.ADD_TOKEN_MAX:
    return {...state, addingTokenMax: true};

    case SCATTER_ACTIONS.ADD_TOKEN_MAX_SUCCESS:
    return {...state, addingTokenMax: false};

    case SCATTER_ACTIONS.CHESTNUT_ADD_XFR_MAX:
    return {...state, addingXfrMax: true};

    case SCATTER_ACTIONS.CHESTNUT_ADD_XFR_MAX_SUCCESS:
    return {...state, addingXfrMax: false};

    default:
      return state;

  }
};

export default reducer;
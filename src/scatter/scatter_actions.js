export const SCATTER_ACTIONS = {
  ATTEMPT_AUTO_LOGIN  : 'SCATTER/AUTO_LOGIN',

  CONNECT         : 'SCATTER/CONNECT',
  CONNECTED       : 'SCATTER/CONNECTED',
  CONNECTION_ERROR: 'SCATTER/ERRORS/CONNECTION_ERROR',

  LOGIN      : 'SCATTER/LOGIN',
  LOGGED_IN  : 'SCATTER/LOGGED_IN',
  LOGIN_ERROR: 'SCATTER/ERRORS/LOGIN_ERROR',

  LOG_OUT        : 'SCATTER/LOGOUT',
  LOGGED_OUT     : 'SCATTER/LOGGED_OUT',

  GET_WALLET: 'SCATTER/GET_WALLET',
  SET_WALLET: 'SCATTER/SET_WALLET',
  GET_WALLET_ERROR: 'SCATTER/GET_WALLET_ERROR',

  SEND_TOKEN: 'SCATTER/SEND_TOKEN',
  SEND_TOKEN_SUCCESS: 'SCATTER/SEND_TOKEN_SUCCESS',

  CREATE_SMART_ACCOUNT: 'SCATTER/CREATE_SMART_ACCOUNT',
  CREATE_SMART_ACCOUNT_SUCCESS: 'SCATTER/CREATE_SMART_ACCOUNT_SUCCESS',

  REMOVE_SMART_ACCOUNT: 'SCATTER/REMOVE_SMART_ACCOUNT',
  REMOVE_SMART_ACCOUNT_SUCCESS: 'SCATTER/REMOVE_SMART_ACCOUNT_SUCCESS',

  REMOVE_SMART_ACCOUNT_APPROVE: 'SCATTER/REMOVE_SMART_ACCOUNT_APPROVE',
  REMOVE_SMART_ACCOUNT_APPROVE_SUCCESS: 'SCATTER/REMOVE_SMART_ACCOUNT_APPROVE_SUCCESS',

  REVERT_ACTIVE_PERMISSION: 'SCATTER/REVERT_ACTIVE_PERMISSION',
  REVERT_ACTIVE_PERMISSION_SUCCESS: 'SCATTER/REVERT_ACTIVE_PERMISSION_SUCCESS',

  AUTH_ERROR: 'SCATTER/ERRORS/AUTH_ERROR',
  SEND_TOKEN_ERROR: 'SCATTER/ERRORS/SEND_TOKEN_ERROR',
};

export const attemptAutoLogin  = () => ({type: SCATTER_ACTIONS.ATTEMPT_AUTO_LOGIN});

export const logout    = () => ({type: SCATTER_ACTIONS.LOG_OUT});
export const loggedOut = () => ({type: SCATTER_ACTIONS.LOGGED_OUT});

export const connectScatter    = () => ({type: SCATTER_ACTIONS.CONNECT});
export const connectedScatter  = () => ({type: SCATTER_ACTIONS.CONNECTED});
export const connectionError   = () => ({type: SCATTER_ACTIONS.CONNECTION_ERROR});

export const logInSuccess      = payload => ({type: SCATTER_ACTIONS.LOGGED_IN, payload});
export const requestLogin      = () => ({type: SCATTER_ACTIONS.LOGIN});
export const loginError        = () => ({type: SCATTER_ACTIONS.LOGIN_ERROR});

export const fetchWallet       = () => ({type: SCATTER_ACTIONS.GET_WALLET});
export const errorGettingWallet= payload => ({type: SCATTER_ACTIONS.GET_WALLET_ERROR, payload});
export const setWallet         = payload => ({type: SCATTER_ACTIONS.SET_WALLET, payload});

export const sendTokens        = payload => ({type: SCATTER_ACTIONS.SEND_TOKEN, payload});
export const tokenTransferred   = () => ({type: SCATTER_ACTIONS.SEND_TOKEN_SUCCESS});

export const createSmartAccount    = payload => ({type: SCATTER_ACTIONS.CREATE_SMART_ACCOUNT, payload});
export const smartAccountCreated   = () => ({type: SCATTER_ACTIONS.CREATE_SMART_ACCOUNT_SUCCESS});

export const removeSmartAccount    = payload => ({type: SCATTER_ACTIONS.REMOVE_SMART_ACCOUNT, payload});
export const smartAccountRemoved   = () => ({type: SCATTER_ACTIONS.REMOVE_SMART_ACCOUNT_SUCCESS});

export const removeSmartAccountApprove    = payload => ({type: SCATTER_ACTIONS.REMOVE_SMART_ACCOUNT_APPROVE, payload});
export const smartAccountRemovedApprove   = () => ({type: SCATTER_ACTIONS.REMOVE_SMART_ACCOUNT_APPROVE_SUCCESS});

export const revertActivePermission    = payload => ({type: SCATTER_ACTIONS.REVERT_ACTIVE_PERMISSION, payload});
export const activePermissionReverted   = () => ({type: SCATTER_ACTIONS.REVERT_ACTIVE_PERMISSION_SUCCESS});
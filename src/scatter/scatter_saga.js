import {takeLatest, put, call} from 'redux-saga/effects';

import {
  SCATTER_ACTIONS,
  connectedScatter,
  logInSuccess,
  connectionError,
  loginError,
  setWallet,
  errorGettingWallet,
  loggedOut,
  tokenTransferred,
  smartAccountCreated,
  smartAccountRemoved,
  activePermissionReverted,
  chestnutTokenTransferred,
  whitelistAdded,
  tokenMaxAdded,
  xfrMaxAdded,
  fetchWallet
} from './scatter_actions';

import {
  connect,
  login,
  loginHistoryExists,
  getWallet,
  logout,
  sendTokens,
  createSmartAccount,
  removeSmartAccount,
  revertActivePermission,
  chestnutSendTokens,
  addwhitelist,
  addtokenmax,
  addxfrmax
} from "./scatter_helper";

import {
  notifyError,
  notifyInfo,
  notifySuccess
} from "../utils";

const APP_NAME = 'ASCENSION';

function* connectWithScatter(){
  try{
    yield call(connect,APP_NAME);
    yield put(connectedScatter());
  }catch(e){
    yield put(connectionError());
  }
}

function* attemptAutoLoginWithScatter(){
  try{
    if(loginHistoryExists()){
      yield call(connect,APP_NAME);
      yield put(connectedScatter());
      
      try{
        const {name, publicKey, authority} = yield call(login);
        yield put(logInSuccess({name, publicKey, keyType: authority}));
        notifySuccess(`Logged in as ${name}`, 1);
      }catch (e) {
        console.error(e)
        notifyError('Scatter rejected login request !', 3);
      }

    }
  }catch(e){
    notifyInfo('Please unlock Scatter !', 3);
  }
}

function* loginWithScatter(){
  try{
    yield call(connect,APP_NAME);
    yield put(connectedScatter());

    try{
      const {name, publicKey, authority} = yield call(login);
      yield put(logInSuccess({name, publicKey, keyType: authority}));
      notifySuccess(`Logged in as ${name}`, 1);
    }catch(e){
      yield put(loginError());
      notifyError('Scatter rejected login request !', 3);
    }

  }catch(e){
    yield put(connectionError());
    notifyError('Please unlock Scatter !', 3);
  }
}

function* fetchUserWallet(){
  try{
    const wallet = yield call(getWallet);
    yield put(setWallet(wallet));
    //notifySuccess(`fetched wallet`, 1);
  }catch(e){
    yield put(errorGettingWallet({message: e.message}));
    notifyError('Error fetching wallet !', 3);
  }
}

function* logOutUser(){
  yield call(logout);
  yield put(loggedOut());
  notifyInfo('Logged out !', 3);
}

function* transferTokens(action){
  try {
    yield call(sendTokens, action.payload);
    yield put(tokenTransferred());
    notifySuccess('Successfully transferred tokens', 3);
    yield put(fetchWallet());
  } catch (e) {
    notifyError(e.message, 5);
  }
}

function* createChestnut(action){
  try {
    yield call(createSmartAccount, action.payload);
    yield put(smartAccountCreated());
    notifySuccess('Successfully Created Smart Account', 3);
    yield put(fetchWallet());
  } catch (e) {
    notifyError(e.message, 5);
  }
}

function* removeChestnut(action){
  try {
    yield call(removeSmartAccount, action.payload);
    yield put(smartAccountRemoved());
    // notifySuccess('Successfully Removed Smart Account Pt1', 3);
    yield put(fetchWallet());
  } catch (e) {
    notifyError(e.message, 5);
  }
}

function* revertChestnutActivePermission(action){
  try {
    yield call(revertActivePermission, action.payload);
    yield put(activePermissionReverted());
    notifySuccess('Successfully Reverted Active Permission', 3);
    yield put(fetchWallet());
  } catch (e) {
    notifyError(e.message, 5);
  }
}

function* chestnutTransferTokens(action){
  try {
    yield call(chestnutSendTokens, action.payload);
    yield put(chestnutTokenTransferred());
    // notifySuccess('Successful', 3);
    yield put(fetchWallet());
  } catch (e) {
    notifyError(e.message, 5);
  }
}

function* chestnutAddWhitelist(action){
  try {
    yield call(addwhitelist, action.payload);
    yield put(whitelistAdded());
    notifySuccess('Successfully Added To Whitelist', 3);
    yield put(fetchWallet());
  } catch (e) {
    notifyError(e.message, 5);
  }
}

function* chestnutAddTokenMax(action){
  try {
    yield call(addtokenmax, action.payload);
    yield put(tokenMaxAdded());
    notifySuccess('Successfully Added Maximum Token Transfer Limit', 3);
    yield put(fetchWallet());
  } catch (e) {
    notifyError(e.message, 5);
  }
}

function* chestnutAddXfrMax(action){
  try {
    yield call(addxfrmax, action.payload);
    yield put(xfrMaxAdded());
    notifySuccess('Successfully Added Maximum Transfer Time Limit', 3);
    yield put(fetchWallet());
  } catch (e) {
    notifyError(e.message, 5);
  }
}

export default function*  missionsSagas(){
  yield takeLatest(SCATTER_ACTIONS.CONNECT, connectWithScatter);
  yield takeLatest(SCATTER_ACTIONS.ATTEMPT_AUTO_LOGIN, attemptAutoLoginWithScatter);
  yield takeLatest(SCATTER_ACTIONS.LOGIN, loginWithScatter);
  yield takeLatest(SCATTER_ACTIONS.GET_WALLET, fetchUserWallet);
  yield takeLatest(SCATTER_ACTIONS.LOG_OUT, logOutUser);
  yield takeLatest(SCATTER_ACTIONS.SEND_TOKEN, transferTokens);
  yield takeLatest(SCATTER_ACTIONS.CREATE_SMART_ACCOUNT, createChestnut);
  yield takeLatest(SCATTER_ACTIONS.REMOVE_SMART_ACCOUNT, removeChestnut);
  yield takeLatest(SCATTER_ACTIONS.REVERT_ACTIVE_PERMISSION, revertChestnutActivePermission);
  yield takeLatest(SCATTER_ACTIONS.CHESTNUT_ADD_WHITELIST, chestnutAddWhitelist);
  yield takeLatest(SCATTER_ACTIONS.ADD_TOKEN_MAX, chestnutAddTokenMax);
  yield takeLatest(SCATTER_ACTIONS.CHESTNUT_ADD_XFR_MAX, chestnutAddXfrMax);
  yield takeLatest(SCATTER_ACTIONS.CHESTNUT_SEND_TOKENS, chestnutTransferTokens);
}
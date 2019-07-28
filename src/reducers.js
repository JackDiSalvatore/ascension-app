import {combineReducers}  from 'redux';

import scatter from './scatter/scatter_reducer';

import AccountInfoReducer from './reducers/AccountInfoReducer';
import delbandReducer from './reducers/delbandReducer';
import EndpointReducer from './reducers/EndpointReducer';
import REXBalanceReducer from './reducers/REXBalanceReducer';

export default combineReducers({
  scatter: scatter,
  //
  endpoint: EndpointReducer,
  accountInfo: AccountInfoReducer,
  rexBalance: REXBalanceReducer,
  delband: delbandReducer,
});
// import { ActionTypes } from 'const';

export const SetActionHistoryAction = (actionHistory) => {
  // console.log("Action fired")
  return {
    type: 'SET_ACTION_HISTORY',
    payload: actionHistory,
  }
}
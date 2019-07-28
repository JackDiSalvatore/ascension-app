// Endpoints;
// const localNet = 'http://localhost:888';
// const jungleTestNet = 'https://jungle2.cryptolions.io:443'
// const jungleTestnetFUllNode = 'https://junglehistory.cryptolions.io:443'
// const mainNet = 'https://api.eosdetroit.io:443';
// const mainNetHistory = 'https://public.eosinfra.io';
// const mainNetBackup = 'http://api.cypherglass.com:8888';

const initialState = 'https://public.eosinfra.io' // Mainnet history
  
export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_ENDPOINT': {
      // console.log(action)
      // return Object.assign({}, state, action.payload)
      return action.payload
    }
    default: {
      break
    }
  }

  return state;
}
import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs2';
import { Api, JsonRpc } from 'eosjs';

import {
  parseEOS,
  toEOSString
} from '../utils';

let
  scatter = null,
  userAccount = null,
  userEosConnection = null;

ScatterJS.plugins( new ScatterEOS() );

// ENDPOINTS

// Jungle TestNet - https://junglehistory.cryptolions.io:443
const network = ScatterJS.Network.fromJson({
  blockchain:'eos',
  chainId:'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
  host:'jungle2.cryptolions.io',
  port:443,
  protocol:'https'
});

// Mainnet History - https://eos.greymass.com:443
// const network = ScatterJS.Network.fromJson({
//   blockchain:'eos',
//   chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
//   host:'eos.greymass.com',
//   port:443,
//   protocol:'https'
// });
const rpc = new JsonRpc(network.fullhost());

export const loginHistoryExists = () => !!localStorage.getItem("lastLoginAt");
const setLoginHistory    = () => localStorage.setItem("lastLoginAt", new Date().getTime());

export const connect = appName => (new Promise((resolve, reject)=> {
  ScatterJS.connect(appName, {network}).then(connected => {
    const
      onSuccess = () => {
        scatter = ScatterJS;
        resolve();
      },
      onError = () => reject({
        message: "Scatter not found. Please install and unlock scatter"
      });

      connected ? onSuccess() : onError();
  });
}));

export const login = ()=> {
    return scatter.login().then(id => {
      if(!id) return console.error('no identity');

      setLoginHistory();
      // Set expiration time for eos connection, can have more options
      const eosOptions = { expireInSeconds: 60 };
      userEosConnection = scatter.eos(network, Api, {rpc}, eosOptions);
      userAccount = scatter.account('eos');

    return {
      name: userAccount.name,
      authority: userAccount.authority,
      publicKey: userAccount.publicKey
    };
  });
};

export const logout = () => scatter.logout();

export const sendTokens = ({to, amount, memo}) => {
  return userEosConnection.transact({
    actions: [{
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
            actor: userAccount.name,
            permission: userAccount.authority,
        }],
        data: {
            from: userAccount.name,
            to: to,
            quantity: amount,
            memo: memo,
        },
    }]
  }, {
      blocksBehind: 3,
      expireSeconds: 30,
  }).then(res => {
      console.log('sent: ', res)
      return res
  });
  // .catch(err => {
  //     console.error('error: ', err)
  //     return err
  // });
};

export const createSmartAccount = () => {
  return userEosConnection.transact(
    {
      actions: [
        // Create @chestnut permission for account
        {
          account: 'eosio',
          name: 'updateauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            permission: 'chestnut',
            parent: 'owner',
            auth: {
              threshold: 1,
              keys: [
                {
                  key: userAccount.publicKey,
                  weight: 1
                }
              ],
              accounts: [],
              waits: []
            }
          }
        },
        // Create the multisig active permission with `chestnutmsig@security` and `account@chestnut`
        {
          account: 'eosio',
          name: 'updateauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            permission: "active",
            parent: "owner",
            auth: {
              threshold: 2,
              keys: [],
              accounts: [
                {
                  permission: {
                    actor: 'chestnutmsig',
                    permission: 'security'
                  },
                  weight: 1
                },
                {
                  permission: {
                    actor: userAccount.name,
                    permission: 'chestnut'
                  },
                  weight: 1
                }
              ],
              waits: []
            }
          }
        },
        // # linkauth of the @chestnut permisssion to `eosio.msig`
        {
          account: 'eosio',
          name: 'linkauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            code: 'eosio.msig',
            type: 'propose',
            requirement: 'chestnut'
          }
        },
        // # linkauth of the @chestnut permission to `eosio.msig` part 2
        {
          account: 'eosio',
          name: 'linkauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            code: 'eosio.msig',
            type: 'approve',
            requirement: 'chestnut'
          }
        },
        // # linkauth of the @chestnut permission to `eosio.msig` part 3
        {
          account: 'eosio',
          name: 'linkauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            code: 'eosio.msig',
            type: 'cancel',
            requirement: 'chestnut'
          }
        },
        // # linkauth of the @chestnut permission to the actions on our smart contract
        {
          account: 'eosio',
          name: 'linkauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            code: 'chestnutmsig',
            type: '',
            requirement: 'chestnut'
          }
        },
        // # update @owner permission with no trusted recovery with friends
        {
          account: 'eosio',
          name: 'updateauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            permission: 'owner',
            parent: "",
            auth: {
              threshold: 2,
              keys: [],
              accounts: [
                {
                  permission: {
                    actor: 'chestnutmsig',
                    permission: 'security'
                  },
                  weight: 1
                },
                {
                  permission: {
                    actor: userAccount.name,
                    permission: 'chestnut'
                  },
                  weight: 1
                }
              ],
              waits: []
            }
          }
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
      broadcast: true
    }
  );
}

export async function removeSmartAccount ()  {
  let actionData = {};

  // CREATE ACTION TO PROPOSE
  let actions = [
    {
      account: 'eosio',
      name: 'updateauth',
      authorization: [
        { 
          actor: userAccount.name,
          permission: 'owner',
        }
      ], data: {
        account: userAccount.name,
        permission: 'owner',
        parent: '',
        auth: {
          threshold: 1,
          keys: [
            {
              key: userAccount.publicKey,
              weight: 1
            }
          ],
          accounts:[],
          waits:[]
        }
      },
    }
  ]

  let seActions = await userEosConnection.serializeActions(actions)
  console.log(' 327 ')
  console.log(seActions[0].data)

  // BUILD THE MULTISIG PROPOSE TRANSACTION
  actionData = {
    proposer: userAccount.name,
    proposal_name: 'backtonormal',
    requested: [
      {
        actor: 'chestnutmsig',
        permission: 'security'
      },
      {
        actor: userAccount.name,
        permission: 'chestnut'
      }
    ],
    trx: {
          expiration: '2020-04-22T16:39:15',
          ref_block_num: 0,
          ref_block_prefix: 0,
          max_net_usage_words: 0,
          max_cpu_usage_ms: 0,
          delay_sec: 0,
          context_free_actions: [],
          actions: [
            {
              account: 'eosio',
              name: 'updateauth',
              authorization: [
                {
                  actor: userAccount.name,
                  permission: 'owner'
                }
              ],
              data: seActions[0].data
            }
          ],
          transaction_extensions: []
        }
  };

    // SEND THE MULTISIG PROPOSE
  userEosConnection.transact({
    actions: [{
      account: 'eosio.msig',
      name: 'propose',
      authorization: [{
        actor: userAccount.name,
        permission: 'chestnut',
      }],
      data: actionData,
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
    broadcast: true,
    sign: true
  });

}

export const removeSmartAccountApprove = () => {
  // SEND MULTISIG APPROVE
  return userEosConnection.transact({
    actions: [{
      account: 'eosio.msig',
      name: 'approve',
      authorization: [{
        actor: userAccount.name,
        permission: 'chestnut',
      }],
      data: {
        proposer: userAccount.name,
        proposal_name: 'backtonormal',
        level: {
          actor:  userAccount.name,
          permission: 'chestnut'
        }
      },
    },
    {
      account: 'chestnutmsig',
      name: 'leave',
      authorization: [{
        actor: userAccount.name,
        permission: 'chestnut',
      }],
      data: {
        proposer: userAccount.name,
        proposal_name: 'backtonormal'
      },
    }
  ]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
    broadcast: true,
    sign: true
  });
};

export const revertActivePermission = () => {

  return userEosConnection.transact(
    {
      actions: [
        // cleos push action eosio updateauth
        {
          account: 'eosio',
          name: 'updateauth',
          authorization: [{
            actor: userAccount.name,
            permission: 'owner',
          }],
          data: {
            account: userAccount.name,
            permission: 'active',
            parent: 'owner',
            auth: {"keys":[{"key":userAccount.publicKey, "weight":1}],"threshold":1,"accounts":[],"waits":[]}
          },
        },
        // cleos push action eosio unlinkauth '["daniel","chestnutmsig",""]' -p daniel@owner
        {
          account: 'eosio',
          name: 'unlinkauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            code: 'chestnutmsig',
            type: '',
          }
        },
        // cleos push action eosio unlinkauth '["daniel","eosio.msig","propose"]' -p daniel@owner
        {
          account: 'eosio',
          name: 'unlinkauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            code: 'eosio.msig',
            type: 'propose',
          }
        },
        // cleos push action eosio unlinkauth '["daniel","eosio.msig","approve"]' -p daniel@owner
        {
          account: 'eosio',
          name: 'unlinkauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            code: 'eosio.msig',
            type: 'approve',
          }
        },
        // cleos push action eosio unlinkauth '["daniel","eosio.msig","cancel"]' -p daniel@owner
        {
          account: 'eosio',
          name: 'unlinkauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            code: 'eosio.msig',
            type: 'cancel',
          }
        },
        // cleos push action eosio deleteauth '{"account": "daniel", "permission": "chestnut"}' -p daniel@owner
        {
          account: 'eosio',
          name: 'deleteauth',
          authorization: [
            {
              actor: userAccount.name,
              permission: userAccount.authority
            }
          ],
          data: {
            account: userAccount.name,
            permission: 'chestnut',
          }
        },
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
      broadcast: true
    }
  );
}

export const addtokenmax = ({ quantity, contract_account }) => {
  return userEosConnection.transact({
    actions: [{
        account: 'chestnutmsig',
        name: 'addtokenmax',
        authorization: [{
            actor: userAccount.name,
            permission: userAccount.authority,
        }],
        data: {
            user: userAccount.name,
            quantity: quantity,
            contract_account: contract_account,
        },
    }]
  }, {
      blocksBehind: 3,
      expireSeconds: 30,
  }).then(res => {
      console.log('sent: ', res)
      return res
  });
}

export const getWallet = async () => {
  // get account details
  const userDetails = await rpc.get_account(userAccount.name);
  const 
    liquidToken = parseEOS(userDetails.core_liquid_balance),
    netStaked = parseEOS(userDetails.total_resources.net_weight),
    cpuStaked = parseEOS(userDetails.total_resources.cpu_weight),
    totalWorth = liquidToken + netStaked + cpuStaked;
    
  return {
    balance: {
      liquidToken,
      totalWorth,
      netStaked,
      cpuStaked,
      refunding: '',
      stakedByOthers: '',
    },
    resource: {
      net: { total: userDetails.net_limit.max, available: userDetails.net_limit.available },
      cpu: { total: userDetails.cpu_limit.max, available: userDetails.cpu_limit.available },
      ram: { total: userDetails.ram_quota, available: userDetails.ram_usage }
    }
  };
};
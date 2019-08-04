const initialState = [
  {
    global_action_seq: "8249619654",
    account_action_seq: 1872,
    block_num: 72126394,
    block_time: "2019-08-03T18:44:36.000",
    action_trace: {
      receipt: {
        receiver: "jdisalvatore",
        act_digest: "6f2428661207bd0d0d19a106a76f801c0df0667393290e139f2f65b282abe62e",
        global_sequence: "8249619654",
        recv_sequence: 1354,
        auth_sequence: [[
            "betdicealert",
            61923938
          ]
        ],
        code_sequence: 14,
        abi_sequence: 14
      },
      act: {
        account: "betdicealert",
        name: "news",
        authorization: [{
            actor: "betdicealert",
            permission: "active"
          }
        ],
        data: {
          message: "Over 300K USD Jackpot! You have one free spin everyday! 超過300萬大獎來了！每天送你一張免費彩票，立即前往抽獎！ https://dice.one?ref=betdic.e"
        },
        hex_data: "a7014f766572203330304b20555344204a61636b706f742120596f752068617665206f6e652066726565207370696e2065766572796461792120e8b685e9818e333030e890ace5a4a7e78d8ee4be86e4ba86efbc81e6af8fe5a4a9e98081e4bda0e4b880e5bcb5e5858de8b2bbe5bda9e7a5a8efbc8ce7ab8be58db3e5898de5be80e68abde78d8eefbc812068747470733a2f2f646963652e6f6e653f7265663d6265746469632e65"
      },
      context_free: false,
      elapsed: 13,
      console: "",
      trx_id: "2eb140d0dbbf65f8a17df031145ec2b6ddb1f3d0a885b5f9add9d10829061036",
      block_num: 72126394,
      block_time: "2019-08-03T18:44:36.000",
      producer_block_id: "044c8fbab109a6fd1d78c398f7cc7145ff64499f08bd3aab472cffe72bb67842",
      account_ram_deltas: [],
      except: null,
      inline_traces: []
    }
  }
]
  
export default function(state = initialState, action) { 
  switch(action.type) {
    case 'SET_ACTION_HISTORY': {
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
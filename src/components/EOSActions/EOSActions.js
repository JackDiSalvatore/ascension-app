import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TokenTransfer from './TokenTransfer';
import SmartAccount from './SmartAccount';
import ChestnutTokenTransfer from './ChestnutTokenTransfer';
import ChestnutAddTokenMax from './ChestnutAddTokenMax';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  textStyle: {
    color: theme.palette.primary.contrastText,
  },
});
  

class AccountDetails extends Component {

    render() {
        const { classes, userAccount, sendTokens, createSmartAccount, removeSmartAccount, removeSmartAccountApprove, revertActivePermission, chestnutSendTokens, addtokenmax } = this.props;

        return (
          <div className={classes.root}>
            <Grid
              container
              spacing={1}
              direction="column"
              alignItems="stretch"
              justify="center"
            >

              <Grid item>
                <TokenTransfer
                  userAccount={userAccount}
                  sendTokens={sendTokens}
                />
              </Grid>

              <Grid item>
                <hr
                  style={{
                    backgroundColor: 'rgb(27,27,29)',
                    border: '1px solid #8DFFA9',
                    color: '#8DFFA9',
                    width: '100%'
                  }}
                />
              </Grid>

              <Grid item>
                <SmartAccount
                  userAccount={userAccount}
                  createSmartAccount={createSmartAccount}
                  removeSmartAccount={removeSmartAccount}
                  removeSmartAccountApprove={removeSmartAccountApprove}
                  revertActivePermission={revertActivePermission}
                />
              </Grid>

              <Grid item>
                <hr
                  style={{
                    backgroundColor: 'rgb(27,27,29)',
                    border: '1px solid #8DFFA9',
                    color: '#8DFFA9',
                    width: '100%'
                  }}
                />
              </Grid>

              <Grid item>
                <ChestnutTokenTransfer
                  chestnutSendTokens={chestnutSendTokens}
                />
              </Grid>

              <Grid item>
                <ChestnutAddTokenMax
                  addtokenmax={addtokenmax}
                />
              </Grid>

            </Grid>
          </div>

        )
    }
}

export default withStyles(styles)(AccountDetails);
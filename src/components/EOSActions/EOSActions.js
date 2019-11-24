import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TokenTransfer from './TokenTransfer';
import SmartAccount from './SmartAccount';
import ChestnutTokenTransfer from './ChestnutTokenTransfer';
import ChestnutAddWhitelist from './ChestnutAddWhitelist';
import ChestnutAddTokenMax from './ChestnutAddTokenMax';
import ChestnutAddXfrMax from './ChestnutAddXfrMax';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  textStyle: {
    color: theme.palette.primary.contrastText,
  },
  hrStyle: {
    backgroundColor: 'rgb(27,27,29)',
    border: '1px solid #8DFFA9',
    color: '#8DFFA9',
    width: '100%'
  }
});
  

class AccountDetails extends Component {

    render() {
        const {
          classes,
          userAccount,
          sendTokens,
          createSmartAccount,
          removeSmartAccount,
          revertActivePermission,
          chestnutSendTokens,
          addwhitelist,
          addtokenmax,
          addxfrmax,
        } = this.props;

        return (
          <div className={classes.root}>
            <Grid
              container
              spacing={0}
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
                <hr className={classes.hrStyle}/>
              </Grid>

              <Grid item>
                <SmartAccount
                  userAccount={userAccount}
                  createSmartAccount={createSmartAccount}
                  removeSmartAccount={removeSmartAccount}
                  revertActivePermission={revertActivePermission}
                />
              </Grid>

              <Grid item>
                <hr className={classes.hrStyle}/>
              </Grid>

              <Grid item>
                <ChestnutTokenTransfer
                  chestnutSendTokens={chestnutSendTokens}
                />
              </Grid>

              <Grid item>
                <hr className={classes.hrStyle}/>
              </Grid>

              <Grid item>
                <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justify="space-between"
                >
                  <Grid item>
                    <ChestnutAddWhitelist
                      addwhitelist={addwhitelist}
                    />
                  </Grid>

                  <Grid item>
                    <ChestnutAddTokenMax
                      addtokenmax={addtokenmax}
                    />
                  </Grid>

                  <Grid item>
                    <ChestnutAddXfrMax
                      addxfrmax={addxfrmax}
                    />
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </div>

        )
    }
}

export default withStyles(styles)(AccountDetails);
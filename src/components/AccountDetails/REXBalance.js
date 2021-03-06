import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  textStyle: {
    color: theme.palette.secondary.contrastText,
  },
  headerTextStyle: {
    color: theme.palette.primary.contrastText,
    // fontFamily: 'Exo2Bold',
    // fontSize: 12,
    letterSpacing: '0.25em',
  }
});
  

class REXBalance extends Component {

    render() {
        const { classes, accountInfo, rexBalance } = this.props;

        var rexVoteStake = '0.0000 EOS'
        var rex_balance = '0.0000 REX'
        // var rexMatured = 0

        if (rexBalance.owner === accountInfo.account_name) {
          rexVoteStake = rexBalance.vote_stake
          rex_balance = rexBalance.rex_balance
          // rexMatured = rexBalance.matured_rex
        }


        return (
          <div style={{textAlign:'left'}}>

            <Typography className={classes.headerTextStyle} variant="caption" gutterBottom>
              REX
            </Typography>

            <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
  
              <Grid item>
                <Typography className={classes.textStyle}>
                  Staked 
                </Typography>
              </Grid>

              <Grid item>
                <Typography className={classes.textStyle}>
                  {rexVoteStake}
                </Typography>
              </Grid> 

            </Grid>

            <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
  
              <Grid item>
                <Typography className={classes.textStyle}>
                  Balance 
                </Typography>
              </Grid>

              <Grid item>
                <Typography className={classes.textStyle}>
                  {rex_balance}
                </Typography>
              </Grid>   

            </Grid>

            {/* <Typography style={{fontSize:12}} variant="body1" gutterBottom>
              REX Matured: 
            </Typography>
            <Typography style={{fontSize:12}} variant="body1" gutterBottom>
              {rexMatured}
            </Typography> */}

            {/* </Grid> */}
          </div>
        )
    }
}

export default withStyles(styles)(REXBalance);
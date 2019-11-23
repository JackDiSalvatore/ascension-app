import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  formGroup: {
    border: '1mm solid rgba(174, 223, 212, .6)',
    backgroundColor: 'rgb(27,27,29)',
    color: theme.palette.primary.main,
  },
  button: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    letterSpacing: '0.2em',
    // paddingLeft: '2.5em',
    // paddingRight: '2.5em',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.10),
      color: theme.palette.primary.contrastText,
      border: '1px solid ' + theme.palette.primary.contrastText,
      borderRadius: '10px', 
    },
  },
  textStyle: {
    color: theme.palette.primary.contrastText,
  },
  input: {
    backgroundColor: 'rgb(27,27,29)',
    border: '1px solid #8DFFA9',
    borderRadius: '10px',
    color: '#8DFFA9',
    height: '2rem',
    width: '10rem',
    paddingLeft: '0.5rem',
    fontSize: '1rem'
  },
});
  

class SmartAccount extends Component {

    constructor(props) {
      super(props);

      this.create = this.create.bind(this);
      this.proposeRemove = this.proposeRemove.bind(this);
      this.revertPermision = this.revertPermision.bind(this);
    }

    create = event => {
      event.preventDefault();
      this.props.createSmartAccount();
    };

    proposeRemove = event => {
      event.preventDefault();
      this.props.removeSmartAccount();
    };

    revertPermision = event => {
      event.preventDefault();
      this.props.revertActivePermission()
    };

    render() {
        const { classes } = this.props;

        return (
          <Grid
            container
            spacing={1}
            direction="column"
            alignItems="flex-start"
            justify="center"
            className={classes.root}
          >

            <Grid item>
              <Button 
                variant="contained"
                color="secondary"
                className={classes.button}
                type="submit"
                onClick={this.create}
              >
                Create Smart Account
              </Button>
            </Grid>

            <Grid item>
              <Button 
                variant="contained"
                color="secondary"
                className={classes.button}
                type="submit"
                onClick={this.proposeRemove}
              >
                Remove Smart Account
              </Button>
            </Grid>

            <Grid item>
              <Button 
                variant="contained"
                color="secondary"
                className={classes.button}
                type="submit"
                onClick={this.revertPermision}
              >
                Remove Chestnut Permission
              </Button>
            </Grid>

          </Grid>
        )
    }
}

export default withStyles(styles)(SmartAccount);
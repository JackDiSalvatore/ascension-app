import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
  hrStyle: {
    // marginTop: '37px',
    // clear: 'both',
    visibility: 'hidden',
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
  dropDown: {
    backgroundColor: 'rgb(27,27,29)',
    border: '1px solid #8DFFA9',
    borderRadius: '10px',
    color: '#8DFFA9'
  },
});
  

class ChestnutAddWhitelist extends Component {

    constructor(props) {
      super(props);
      this.state = {
        account_to_add: '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = event => {
      event.preventDefault();
      const {account_to_add} = this.state;
      this.props.addwhitelist({account_to_add});
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
              <Typography className={classes.textStyle} variant="h6">
                Add To Whitelist
              </Typography>
            </Grid>

            <Grid item>

              <form onSubmit={this.handleSubmit}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <input
                      name="account_to_add"
                      type="text"
                      placeholder="account:"
                      className={classes.input}
                      value={this.state.account_to_add}
                      onChange={this.handleChange}
                    />
                  </Grid>
  
                  <Grid item>
                    <Button 
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      >
                    </Button>
                  </Grid>
                </Grid>
              </form>

            </Grid>
          </Grid>
        )
    }
}

export default withStyles(styles)(ChestnutAddWhitelist);
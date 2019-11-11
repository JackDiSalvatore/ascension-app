import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // textAlign: 'center',
    // margin: 'auto',
    // width: '50%',
    // margin: '1% auto 1% auto',
  },
  formGroup: {
    border: '1mm solid rgba(174, 223, 212, .6)',
    backgroundColor: 'rgb(27,27,29)',
    color: theme.palette.primary.main,
  },
  itemStyle: {
    // marginRight: '5px',
    // marginLeft: '5px',
    // border: '1px dotted blue'
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
  // margin: {
  //   margin: theme.spacing(1),
  // },
  textStyle: {
    color: theme.palette.primary.contrastText,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'none',
    '&:hover': {
      backgroundColor: fade('rgb(27,27,29)', 0.25),
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
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
  

class TokenTransfer extends Component {

    constructor(props) {
      super(props);
      this.state = {
        to: '',
        amount: '',
        memo: 'sent via ascension'
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = event => {
      event.preventDefault();
      const {to, amount, memo} = this.state;
      this.props.sendTokens({to, amount, memo});
    };

    render() {
        const { classes, accountInfo } = this.props;

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
                Transfer Tokens
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
                      name="to"
                      type="text"
                      placeholder="to:"
                      className={classes.input}
                      value={this.state.to}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <input
                      name="amount"
                      type="text"
                      placeholder="amount:"
                      className={classes.input}
                      value={this.state.amount}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  {/* <Grid item>
                  <Form.Group style={{marginBottom: '0'}}>
                    <Form.Control as="select" style={{
                        backgroundColor: '#8DFFA9',
                        border: '1px solid #8DFFA9',
                        borderRadius: '10px',
                        color: 'rgb(27,27,29)'
                      }}>
                      <option>EOS</option>
                    </Form.Control>
                  </Form.Group>
                  </Grid> */}
                  <Grid item>
                    <Button 
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </form>

            </Grid>
          </Grid>
        )
    }
}

export default withStyles(styles)(TokenTransfer);
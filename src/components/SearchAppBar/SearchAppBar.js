import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
// import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

//import SelectChain from './SelectChain';

import eosLogo from './eosLogo.png';
// import arrowIcon from'./arrow.png';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textStyle: {
    color: theme.palette.secondary.contrastText,
  },
  toolbarStyles: {
    padding: '10px 32px 10px 32px'
  },
  gridStyles: {
    // border: '2px solid purple',
  },
  button: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    letterSpacing: '0.2em',
    paddingLeft: '2.5em',
    paddingRight: '2.5em',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.10),
      color: theme.palette.primary.contrastText,
      border: '1px solid ' + theme.palette.primary.contrastText,
      borderRadius: '10px', 
    },
  },
  search: {
    position: 'relative',
    // borderRadius: theme.shape.borderRadius,
    borderRadius: '10px',
    border: '1px solid #8DFFA9',
    // backgroundColor: fade(theme.palette.common.white),
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.10),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    color: '#8DFFA9',
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eosLogo: {
    width: theme.spacing(4),
    // marginTop: '0.25%',
    // marginLeft: '0.152%',
  },
  eosTicker: {
    marginLeft: '1.25px',
    // fontSize: '0.75rem',
  },
  arrowContainer: {
    margin: 0,
    padding: 0,
    border: '1px dotted white',
  },
  arrowIcon: {
    width: theme.spacing(7),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: 120,
    //   '&:focus': {
    //     width: 150
    //   },
    // },
  },
});

// export default function SearchAppBar() 
class SearchAppBar extends Component {

  async handleFormEvent(event) {
    // stop default behaviour
    event.preventDefault();

    this.props.getAccountDetails(event.target.accountNameSearch.value);
  }

  async handleLogIn(event) {
    // stop default behaviour
    event.preventDefault();

    this.props.loginUser();
  }

  async handleLogOut(event) {
    // stop default behaviour
    event.preventDefault();

    this.props.logOutUser();
  }

  render() {
    // const { classes, chainId } = this.props;
    const { classes, loggedIn, userAccount } = this.props;

    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbarStyles}>

          <Grid container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.gridStyles}
          >

            <Grid item>
              <Grid container
                  spacing={4}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  className={classes.gridStyles}
                >

                <Grid item>
                  <Grid container spacing={0} direction="column">
                    <Grid item>
                      <img className={classes.eosLogo} src={eosLogo} alt={"not loaded"}/>
                    </Grid>

                    <Grid item>
                      <Typography className={classes.eosTicker}>
                        EOS
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/* <Grid item>
                  <img className={classes.arrowIcon} src={arrowIcon}/>
                  <SelectChain setChainFunction={this.props.setChain}></SelectChain>
                </Grid> */}

                <Grid item>
                  <form onSubmit={this.handleFormEvent.bind(this)}>
                    <div className={classes.search}>
                    
                      <Button className={classes.searchIcon} type="submit">
                        <SearchIcon />
                      </Button>
                      
                      <InputBase
                        name="accountNameSearch"
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'Search' }}
                      />
                      
                    </div>
                  </form>
                </Grid>

              </Grid>
            </Grid>

            <Grid item>
              {
                loggedIn ?
                  <div>
                    <Button 
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={this.handleLogOut.bind(this)}
                    >
                      Log out
                    </Button>

                    <Typography className={classes.textStyle}>
                      {
                        userAccount.name
                      }@{
                        userAccount.keyType
                      }
                    </Typography>
                  </div>
                  :
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={this.handleLogIn.bind(this)}
                  >
                    Log in
                  </Button>
              }
            </Grid>

          </Grid>

        </Toolbar>
      </AppBar>
      </div>
    )
  };
}

export default withStyles(styles)(SearchAppBar);
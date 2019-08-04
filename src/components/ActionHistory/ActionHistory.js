import React from 'react';

import PropTypes from 'prop-types';

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// ======================================================== //

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));
 
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// ======================================================== //

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
    paddingLeft: 0,
  },
  body: {
    fontSize: 14,
    paddingLeft: 0,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  // root: {
  //   '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.background.default,
  //   },
  // },
  root: {
    backgroundColor: theme.palette.background.main,
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: '75%',
    // marginTop: theme.spacing(3),
    margin: '1% auto 5% auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  headerTextStyle: {
    color: theme.palette.primary.contrastText,
    // marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  tableHeaderTextStyle: {
    backgroundColor: theme.palette.background.main,
    color: theme.palette.primary.contrastText,
  },
  actionNameTextStyle: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    paddingLeft: '0.25em',
  },
}));
  

export default function ActionHistory(props) {
  const classes = useStyles();
  const actions = props.actionHistory

  //console.log('Action History')
  //console.log(JSON.stringify(actions[0].action_trace.act.data))

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, actions.length - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  
  return (
    <div className={classes.root}>
      <Typography className={classes.headerTextStyle} variant="h5">
        History
      </Typography>

      <Paper>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>

            <TableHead>
              <TableRow>
                <StyledTableCell align="left" className={classes.tableHeaderTextStyle} width="10%">Date</StyledTableCell>
                <StyledTableCell align="left" className={classes.tableHeaderTextStyle} width="20%">Name</StyledTableCell>
                <StyledTableCell align="left" className={classes.tableHeaderTextStyle}>Data</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {actions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <StyledTableRow key={row.account_action_seq}>
                  
                  <StyledTableCell component="th" scope="row" align="left">
                    <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={0}>
                      <Grid item>
                        { new Date(row.action_trace.block_time).getMonth() }/
                        { new Date(row.action_trace.block_time).getDay() }/
                        { new Date(row.action_trace.block_time).getFullYear() } 
                      </Grid>

                      <Grid item>
                        { new Date(row.action_trace.block_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).replace(/^[0|\D]*/,'') }
                      </Grid>  
                    </Grid>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={0}>
                      <Grid item>
                        {row.action_trace.act.account}
                      </Grid>

                      <Grid item>
                        <Typography className={classes.actionNameTextStyle}>
                          {row.action_trace.act.name}
                        </Typography>
                      </Grid>
                    </Grid>         
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {
                      JSON.stringify(row.action_trace.act.data)
                      .replace('{', '')
                      .replace('}', '')
                      .replace(/:/g, ': ')
                      .replace(/",/g, '"\n').split('\n').map(function(item, key) {
                        return (
                          <span key={key}>
                            {item.replace(/"/g, '')}
                            <br/>
                          </span>
                        )
                      })
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}

              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 0 }}>
                  {/* <StyledTableCell colSpan={6} /> */}
                </StyledTableRow>
              )}

            </TableBody>

            <TableFooter>
              <StyledTableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  colSpan={3}
                  count={actions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </StyledTableRow>
            </TableFooter>

          </Table>
        </div>
      </Paper>
    </div>
  )
}

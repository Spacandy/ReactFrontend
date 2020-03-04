//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import calculateTotalPrice from 'helpers/transaction/calculators/calculateTotalPrice';

const styles = () => ({
  typographyRoot: {
    textAlign: 'center',
  },
  paper: {
    padding: 10,
    margin: '20px 0',
  },
  feesWarning: {
    display: 'none',
    '@media (max-width: 550px)': {
      display: 'inline-table',
      position: 'relative',
      bottom: -53,
      paddingLeft: 10,
    },
  },
  totalTable: {
    width: 100,
    float: 'right',
    margin: '20px 10px 0',
    '@media (max-width: 550px)': {
      margin: '20px 0 0',
    },
  },
  totalValue: {
    textAlign: 'center',
  },
});

type Item = {
  ticketName: string,
  quantity: number,
  price: string,
  fees: string,
  subtotal: string,
};

type Props = {
  classes: {
    typographyRoot: {},
    paper: {},
    feesWarning: {},
    totalTable: {},
    totalValue: {},
  },

  selectedItems: {
    map: Function,
  },
};

const generateBody = items => {
  return items.map((item, index) => (
    <TableRow>
      <TableCell
        style={{
          textAlign: 'center',
          maxWidth: 64,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {item.ticketName || item.sponsorshipName}
      </TableCell>
      <Hidden xsDown>
        <TableCell numeric style={{ textAlign: 'center' }}>
          {`$${item.price.toFixed(2)}`}
        </TableCell>
        <TableCell numeric style={{ textAlign: 'center' }}>
          {`$${item.fees ? item.fees.toFixed(2) : 0}`}
        </TableCell>
        <TableCell numeric style={{ textAlign: 'center' }}>
          {item.quantity}
        </TableCell>
      </Hidden>
      <TableCell numeric style={{ textAlign: 'center' }}>
        {`$${item.subtotal.toFixed(2)}`}
      </TableCell>
    </TableRow>
  ));
};

const CheckoutTransactionInfo = (props: Props) => {
  return (
    <Paper className={props.classes.paper} elevation={4}>
      <Typography variant="display1" classes={{ root: props.classes.typographyRoot }}>
        Summary
      </Typography>
      <div style={{ margin: '20px', display: 'table' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'center' }}>TICKET TYPE</TableCell>
              <TableCell numeric>PRICE</TableCell>
              <Hidden xsDown>
                <TableCell numeric style={{ textAlign: 'center' }}>
                  FEES
                </TableCell>
                <TableCell numeric style={{ textAlign: 'center' }}>
                  QUANTITY
                </TableCell>
                <TableCell numeric style={{ textAlign: 'center' }}>
                  SUBTOTAL
                </TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>{generateBody(props.selectedItems)}</TableBody>
        </Table>
        <Typography className={props.classes.feesWarning}>
          All Fees included in price
        </Typography>
        <Table className={props.classes.totalTable}>
          <TableHead>
            <TableRow>
              <TableCell numeric style={{ textAlign: 'center' }}>
                TOTAL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography className={props.classes.totalValue}>
                  {`$${calculateTotalPrice(props.selectedItems).toFixed(2)}`}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};
export default withStyles(styles)(CheckoutTransactionInfo);

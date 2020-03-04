//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import history from 'localHistory';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ACHForm from './ACHForm';
import CCForm from './CCForm';
import EventInfo from './CheckoutEventInfo';
import TransactionInfo from './CheckoutTransactionInfo';

// Types
import type { Props, State } from './types';

// Styles
import stylesGenerator from './styles';

const styles = theme => stylesGenerator(theme);

class Checkout extends React.Component<Props, State> {
  props: Props;

  render() {
    const { classes, selectedItems, eventData, mode, user } = this.props;

    return (
      <div className={classes.root}>
        <img
          className={classes.logo}
          alt="EventHi Logo"
          src="https://d3rd29nk50moi4.cloudfront.net/logo.png"
        />
        <EventInfo classes={classes} eventData={eventData} />
        <TransactionInfo selectedItems={selectedItems} />

        <Paper className={classes.paper} elevation={4}>
          <Typography
            variant="headline"
            style={{ padding: '20px 0' }}
            classes={{ root: classes.typographyRoot }}
          >
            Payment
          </Typography>
          {mode === 'ticket' && <CCForm userInfo={user} selectedItems={selectedItems} />}
          {mode === 'sponsorship' && (
            <ACHForm userInfo={user} selectedItems={selectedItems} classes={classes} />
          )}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventData: state.checkout.eventData,
  selectedItems: state.checkout.selectedItems,
  mode: state.checkout.mode,
  user: {
    displayName: state.auth.displayName,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    email: state.auth.email,
    id: state.auth.id,
  },
});

export default compose(
  withStyles(styles),
  withApollo,
  connect(
    mapStateToProps,
    null,
  ),
)(Checkout);

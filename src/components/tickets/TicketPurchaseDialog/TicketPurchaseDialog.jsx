//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import classNames from 'classnames';
import serialize from 'serialize-javascript';
import { Select as SelectField } from 'lib/redux-form-material-ui';
import history from 'localHistory';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import format from 'date-fns/format';
import closestTo from 'date-fns/closest_to';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import isEmpty from 'helpers/isEmpty';
// Material-UI
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

// Local Components
import Svg from 'components/Svg';
import ConfirmationDialog from 'components/dialogs/ConfirmationDialog';

import Visa from 'components/creditCardIcons/Visa';
import Mastercard from 'components/creditCardIcons/Mastercard';
import Discover from 'components/creditCardIcons/Discover';
import Amex from 'components/creditCardIcons/Amex';

// Helpers
import isActive from 'helpers/ticketTypes/isActive';
import isSoldOut from 'helpers/ticketTypes/isSoldOut';
import isStarted from 'helpers/ticketTypes/isStarted';
import isEnded from 'helpers/ticketTypes/isEnded';
import isFree from 'helpers/ticketTypes/isFree';
import calculateFees from 'helpers/ticketTypes/calculateFees';
import calculateTotalQuantity from 'helpers/transaction/calculators/calculateTotalQuantity';
import calculateTotalPrice from 'helpers/transaction/calculators/calculateTotalPrice';
import processTransactionItems from 'helpers/transaction/processors/processTransactionItems';

// Actions
import { setCheckoutData } from 'actions/checkoutData';
import { setPurchaseTicketModalState } from 'actions/modals/purchaseTicketsModal';
import { setPurchaseCongratsModalState } from 'actions/modals/purchaseCongratsModal';

// GraphQL
import purchaseTicketsMutation from './purchaseTickets.graphql';
import purchaseSponsorshipsMutation from './purchaseSponsorships.graphql';

import checkoutEventDataQuery from './checkoutEventDataQuery.graphql';

// Types
import type { Props, State } from './types';
import formatDateLong from 'helpers/dates/formatDateLong';

// Styles
import stylesGenerator from './stylesGenerator';

const styles = theme => {
  return stylesGenerator(theme);
};

class TicketPurchaseDialog extends Component<Props, State> {
  state: State = {
    indexOpen: null,
    confirmationDialogOpen: false,
  };
  props: Props;

  handleRequestClose = () => {
    this.props.dispatch(setPurchaseTicketModalState(false));
    this.props.change('items', {});
    if (this.props.onClose) this.props.onClose();
  };

  getFirstTicketSaleDate = tickets => {
    const getStarts = t => {
      let times = [];
      t.map(ticket => times.push(ticket.salesStart));
      return times;
    };
    const startDates = getStarts(tickets) || [];
    const closestDate = closestTo(new Date(), startDates);

    return closestDate;
  };

  handleExpand = index => {
    const { indexOpen } = this.state;

    if (indexOpen === index) {
      return this.setState({ indexOpen: null });
    }
    this.setState({ indexOpen: index });
  };

  handleFreeTransaction = (items, tickets, amountToCharge, fees, spreedlyToken = 0) => {
    const idempotencyKey = Math.floor(Math.random() * 1e17).toString();
    const selectedItems = processTransactionItems(tickets, this.props.selectedItems);

    if (this.props.authenticated) {
      if (selectedItems[0].itemType === 'sponsorship') {
        return this.props
          .purchaseSponsorships({ variables: { items: selectedItems } })
          .then(() => {
            this.setState(() => ({ confirmationDialogOpen: false }));
            this.props.dispatch(setPurchaseTicketModalState(false));
            return this.props.dispatch(setPurchaseCongratsModalState(true));
          })
          .catch(error => console.warn(error));
      }

      return this.props
        .purchaseTickets({
          variables: {
            spreedlyToken,
            idempotencyKey,
            selectedItems,
          },
        })
        .then(() => {
          this.setState(() => ({ confirmationDialogOpen: false }));
          this.props.dispatch(setPurchaseTicketModalState(false));
          return this.props.dispatch(setPurchaseCongratsModalState(true));
        })
        .catch(error => console.warn(error));
    }
  };

  handlePurchase = items => {
    const { tickets, timezone, eventId, selectedItems } = this.props;
    const filteredTicketTypes = this.reorderTicketTypes(tickets, eventId, timezone);
    if (
      Number(
        calculateTotalPrice(processTransactionItems(filteredTicketTypes, selectedItems)) >
          0,
      )
    ) {
      this.props.client
        .query({
          query: checkoutEventDataQuery,
          variables: { id: String(eventId) },
          fetchPolicy: 'network-only',
        })
        .then(response => {
          this.props.dispatch(
            setCheckoutData(
              response.data.eventDetails,
              processTransactionItems(filteredTicketTypes, selectedItems),
              filteredTicketTypes[0].itemType || 'ticket',
            ),
          );
          this.props.dispatch(
            setPurchaseTicketModalState(false, null, filteredTicketTypes, timezone),
          );
          history.push('/checkout');
        });
    } else {
      this.props.dispatch(
        setPurchaseTicketModalState(
          false,
          null,
          filteredTicketTypes,
          this.props.timezone,
        ),
      );
      this.setState({ confirmationDialogOpen: true });
    }
  };

  handleFreeConfirmBuy = (items, tickets) => {
    this.handleFreeTransaction(items, tickets, 0, 0);
  };

  handleFreeConfirmCancel = () => {
    this.setState({ confirmationDialogOpen: false });
    this.props.dispatch(setPurchaseCongratsModalState(false));
    this.props.dispatch(
      setPurchaseTicketModalState(false, null, this.props.tickets, this.props.timezone),
    );
  };

  generateQuantitySelections = (remaining, ticketMaxPerOrder, salesEnd, timezone) => {
    let actualMaxPerOrder;
    let quantities = [];

    if (isSoldOut(remaining)) remaining = 0;

    if (Number(remaining) < Number(ticketMaxPerOrder)) {
      actualMaxPerOrder = remaining;
    } else {
      actualMaxPerOrder = ticketMaxPerOrder;
    }

    if (isSoldOut(remaining)) actualMaxPerOrder = 0;
    if (isEnded(salesEnd, timezone)) actualMaxPerOrder = 0;

    actualMaxPerOrder += 1;

    quantities = [...Array(actualMaxPerOrder).keys()];
    return quantities.map(key => (
      <MenuItem key={key} value={key}>
        {key}
      </MenuItem>
    ));
  };

  generatePriceText = (ticket, timezone) => {
    const { price } = ticket;
    let fees;

    if (isSoldOut(ticket.remaining)) return 'SOLD OUT';
    if (isEnded(ticket.salesEnd, timezone)) return 'SALE ENDED';
    if (isFree(Number(ticket.price))) return 'FREE';

    if (ticket.feesType === 'pass') {
      fees = calculateFees(ticket).toFixed(2);
      return [
        Number(price).toFixed(2),
        fees > 0 ? (
          <span style={{ color: '#666A73', fontSize: 13 }}>{` + ${fees} FEE`}</span>
        ) : null,
      ];
    }
    return `$${Number(price).toFixed(2)}`;
  };

  generateFOMO = (ticket, timezone) => {
    const fixTimeBrowserCompat = dateString =>
      dateString.replace(/-/g, '/').replace(/T/g, ' ');

    const formattedDate = formatDateLong(ticket.salesEnd, timezone);

    if (isActive(ticket, timezone)) return `Sale ends on ${formattedDate}`;
    return `Sale ended on ${formattedDate}`;
  };

  isSelectDisabled = (ticket, timezone) => {
    if (isEnded(ticket.salesEnd, timezone) || isSoldOut(ticket.remaining)) {
      return true;
    }
    return false;
  };

  reorderTicketTypes = (tickets, eventId, timezone) => {
    const activeTicketTypes = tickets
      .filter(ticket => {
        if (!isSoldOut(ticket.remaining) && ticket.active)
          return (
            !isEnded(ticket.salesEnd, timezone) &&
            !ticket.ticketName.includes('(Early Bird)')
          );
      })
      .sort((a, b) => Number(a.id) - Number(b.id));

    const earlyBirdTicketTypes = tickets.filter(ticket =>
      ticket.ticketName.includes('(Early Bird)'),
    );

    const soldOutTicketTypes = tickets
      .filter(ticket => isSoldOut(ticket.remaining))
      .sort((a, b) => Number(a.id) - Number(b.id));

    const saleEndedTicketTypes = tickets
      .filter(ticket => {
        if (!isSoldOut(ticket.remaining)) return isEnded(ticket.salesEnd, timezone);
      })
      .sort((a, b) => Number(a.id) - Number(b.id));

    if (eventId === '1881')
      return [
        ...earlyBirdTicketTypes,
        ...activeTicketTypes,
        ...soldOutTicketTypes,
        ...saleEndedTicketTypes,
      ];

    return [
      ...activeTicketTypes,
      ...earlyBirdTicketTypes,
      ...soldOutTicketTypes,
      ...saleEndedTicketTypes,
    ];
  };

  renderCCIcons = t => {
    const notFree = element => Number(element.price) > 0;
    // Check if tickets contain at least one paid ticket and the type of the first item
    if (t.some(notFree) && t.length > 0 && t[0].itemType === 'ticket')
      return (
        <div
          style={{
            width: 180,
            margin: '10px auto 0',
          }}
        >
          <Visa style={{ margin: 5, fontSize: 35 }} />
          <Mastercard style={{ margin: 5, fontSize: 35 }} />
          <Discover style={{ margin: 5, fontSize: 35 }} />
          <Amex style={{ margin: 5, fontSize: 35 }} />
        </div>
      );
    if (t.some(notFree) && t.length > 0 && t[0].itemType === 'sponsorship')
      return (
        <div
          style={{
            width: 120,
            margin: '10px auto 0',
          }}
        >
          <img
            src="https://d3rd29nk50moi4.cloudfront.net/photos/user/2018/08/15/153437405894368601.jpg"
            style={{ width: 120 }}
          />
        </div>
      );
  };

  generateTitle = items => {
    if (items && items.length > 0) {
      if (items[0].itemType === 'sponsorship') return 'Sponsorships';
    }
    return 'Tickets';
  };
  render() {
    const {
      fullScreen,
      isTicketsModalOpen,
      eventId,
      classes,
      tickets,
      timezone,
      selectedItems,
    } = this.props;

    const filteredTicketTypes = this.reorderTicketTypes(tickets, eventId, timezone);

    const { confirmationDialogOpen, indexOpen } = this.state;

    return [
      <Dialog
        fullScreen={fullScreen}
        open={isTicketsModalOpen}
        onClose={this.handleRequestClose}
        classes={{ paperWidthSm: classes.paperWidthSm }}
        key="0"
      >
        <DialogTitle>{this.generateTitle(filteredTicketTypes)}</DialogTitle>
        <DialogContent classes={{ root: classes.dialogContentRoot }}>
          {filteredTicketTypes
            ? filteredTicketTypes.map((ticket, index) => {
                const className = classNames(this.props.classes.root, {
                  [this.props.classes.expanded]:
                    this.props.eventId === '946' ||
                    this.props.eventId === '1016' ||
                    this.props.eventId === '1074' ||
                    this.props.eventId === '1107' ||
                    this.props.eventId === '1108' ||
                    this.props.eventId === '1109' ||
                    this.props.eventId === '1112' ||
                    this.props.eventId === '1170' ||
                    this.props.eventId === '1245' ||
                    this.props.eventId === '1361' ||
                    this.props.eventId === '1366' ||
                    this.props.eventId === '1453' ||
                    this.props.eventId === '1472' ||
                    this.props.eventId === '1473' ||
                    this.props.eventId === '1904' ||
                    this.props.eventId === '1958' ||
                    this.props.eventId === '2062' ||
                    this.props.eventId === '2390' ||
                    this.state.indexOpen === index,
                  [this.props.classes.disabled]:
                    this.generatePriceText(ticket, timezone) === 'SOLD OUT' ||
                    this.generatePriceText(ticket, timezone) === 'SALE ENDED',
                });
                const dataClasses = classNames({
                  [this.props.classes.cv]: !ticket.showQuantity,
                });

                const started = element => !isStarted(element.salesStart, timezone);

                if (filteredTicketTypes.every(started)) {
                  return (
                    <Typography
                      style={{ textAlign: 'center', fontSize: 20 }}
                    >{`Sales begin in ${distanceInWordsToNow(
                      this.getFirstTicketSaleDate(filteredTicketTypes),
                    )}!`}</Typography>
                  );
                }

                return isStarted(ticket.salesStart, timezone) ? (
                  <div>
                    <Zoom in={ticket} style={{ transitionDelay: Number(index) * 150 }}>
                      <Paper className={className}>
                        <div style={{ display: 'flex' }}>
                          <div>
                            <Typography className={dataClasses}>
                              {ticket.ticketName}
                            </Typography>
                            <Typography>
                              {this.generatePriceText(ticket, timezone)}
                            </Typography>
                            {ticket.showQuantity ? (
                              <Typography>{`Quantity Remaining: ${ticket.remaining}`}</Typography>
                            ) : null}
                          </div>
                          <div
                            className={classes.actionWrapper}
                            style={{
                              marginLeft: 'auto',
                              margin: '7px 0 7px auto',
                              paddingLeft: 3,
                            }}
                          >
                            <Field
                              name={`items.t${ticket.id}`}
                              component={SelectField}
                              disabled={this.isSelectDisabled(ticket, timezone)}
                              label="Quantity"
                            >
                              {this.generateQuantitySelections(
                                ticket.remaining,
                                ticket.maxPerOrder,
                                ticket.salesEnd,
                                timezone,
                              )}
                            </Field>
                            <IconButton
                              onClick={() => this.handleExpand(index)}
                              aria-label="Expand Ticket Description"
                            >
                              <Svg
                                style={{
                                  transform:
                                    this.props.eventId === '946' ||
                                    this.props.eventId === '1016' ||
                                    this.props.eventId === '1074' ||
                                    this.props.eventId === '1107' ||
                                    this.props.eventId === '1108' ||
                                    this.props.eventId === '1109' ||
                                    this.props.eventId === '1112' ||
                                    this.props.eventId === '1170' ||
                                    this.props.eventId === '1245' ||
                                    this.props.eventId === '1361' ||
                                    this.props.eventId === '1366' ||
                                    this.props.eventId === '1453' ||
                                    this.props.eventId === '1472' ||
                                    this.props.eventId === '1473' ||
                                    this.props.eventId === '1904' ||
                                    this.props.eventId === '1958' ||
                                    this.props.eventId === '2062' ||
                                    this.props.eventId === '2390' ||
                                    indexOpen === index
                                      ? 'rotate(90deg)'
                                      : 'rotate(270deg)',
                                }}
                                icon="ChevronLeft"
                              />
                            </IconButton>
                          </div>
                          <div
                            style={{
                              padding: '0 20px 5px 0',
                              position: 'absolute',
                              right: 0,
                              bottom: 0,
                            }}
                          >
                            {ticket.salesEnd ? (
                              <Typography variant="caption">
                                {this.generateFOMO(ticket, timezone)}
                              </Typography>
                            ) : null}
                          </div>
                        </div>
                        <Collapse
                          in={
                            this.props.eventId === '946' ||
                            this.props.eventId === '1016' ||
                            this.props.eventId === '1074' ||
                            this.props.eventId === '1107' ||
                            this.props.eventId === '1108' ||
                            this.props.eventId === '1109' ||
                            this.props.eventId === '1112' ||
                            this.props.eventId === '1170' ||
                            this.props.eventId === '1245' ||
                            this.props.eventId === '1361' ||
                            this.props.eventId === '1366' ||
                            this.props.eventId === '1453' ||
                            this.props.eventId === '1472' ||
                            this.props.eventId === '1473' ||
                            this.props.eventId === '1904' ||
                            this.props.eventId === '1958' ||
                            this.props.eventId === '2062' ||
                            this.props.eventId === '2390' ||
                            indexOpen === index
                          }
                          style={{ display: 'block' }}
                        >
                          <Typography>{ticket.description}</Typography>
                        </Collapse>
                      </Paper>
                    </Zoom>
                  </div>
                ) : null;
              })
            : null}
          {this.renderCCIcons(filteredTicketTypes)}
        </DialogContent>
        <DialogActions>
          {Number(
            calculateTotalQuantity(processTransactionItems(tickets, selectedItems)),
          ) > 0 ? (
            <div style={{ marginRight: 'auto', paddingLeft: 20 }}>
              <Typography>{`Quantity: ${calculateTotalQuantity(
                processTransactionItems(tickets, selectedItems),
              )}`}</Typography>
              <Typography>{`$${calculateTotalPrice(
                processTransactionItems(tickets, selectedItems),
              ).toFixed(2)}`}</Typography>
            </div>
          ) : null}
          <div style={{ display: 'flex' }}>
            <Button onClick={() => this.handleRequestClose()} color="inherit">
              Cancel
            </Button>
            <Button
              disabled={isEmpty(processTransactionItems(tickets, selectedItems))}
              onClick={() =>
                this.props.authenticated
                  ? this.handlePurchase(this.props.selectedItems)
                  : this.props.openSignupModal()
              }
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </DialogActions>
      </Dialog>,
      <ConfirmationDialog
        title="Buy ticket confirmation"
        description="Are you sure that you want to buy a ticket?"
        key="1"
        open={confirmationDialogOpen}
        handleCancel={this.handleFreeConfirmCancel}
        handleConfirm={() => this.handleFreeConfirmBuy(this.props.selectedItems, tickets)}
      />,
    ];
  }
}

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector(ownProps.form);
  return {
    isTicketsModalOpen: state.modals.purchaseTicketsModal.open,
    timezone: state.modals.purchaseTicketsModal.timezone,
    tickets: state.modals.purchaseTicketsModal.availableTickets,
    eventId: state.modals.purchaseTicketsModal.eventId,
    selectedItems: selector(state, 'items'),
    authenticated: state.auth.authenticated,
    user: {
      displayName: state.auth.displayName,
      firstName: state.auth.firstName,
      lastName: state.auth.lastName,
      email: state.auth.email,
    },
    congratsOpen: state.modals.purchaseCongratsModal.open,
  };
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default compose(
  withMobileDialog(),
  withStyles(styles),
  graphql(purchaseTicketsMutation, { name: 'purchaseTickets' }),
  graphql(purchaseSponsorshipsMutation, { name: 'purchaseSponsorships' }),
  withApollo,
  reduxForm({ form: 'purchaseDialog' }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TicketPurchaseDialog);

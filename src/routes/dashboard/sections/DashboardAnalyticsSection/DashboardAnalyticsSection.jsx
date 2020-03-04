//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import eventAnalyticsQuery from './eventAnalytics.graphql';
import Grid from '@material-ui/core/Grid';
import StatsCard from 'components/cards/StatsCard';
import hostedEventsQuery from '../../hostedEvents.graphql';
import publishEventMutation from '../../publishEvent.graphql';
import ConfirmationDialog from 'components/dialogs/ConfirmationDialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import history from 'localHistory';
import LinearProgress from '@material-ui/core/LinearProgress';
import isEmpty from 'helpers/isEmpty';
import { formatNumber } from '../../../../data/utils';

type PropsType = {
  eventId: number,
};

type DefaultPropsType = {};

type StateType = {
  secondsLeft: number,
  activeColor: number,
};

const styles = theme => ({
  card: {
    maxWidth: 310,
    minWidth: 240,
    minHeight: 150,
    height: 300,
    textAlign: 'center',
  },
  cardMobile: {
    maxWidth: 310,
    minWidth: 240,
    minHeight: 150,
    height: 300,
  },
  cardDesktop: {
    maxWidth: 310,
    minWidth: 240,
    minHeight: 150,
    height: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  data: {
    marginBottom: 16,
    fontSize: 50,
    color: '#424242',
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: '#fb8c00',
  },
  colorPrimary: {
    backgroundColor: '#fb8c002e',
  },
});

class DashboardAnalyticsSection extends Component<
  DefaultPropsType,
  PropsType,
  StateType,
> {
  static defaultProps: DefaultPropsType;
  props: PropsType;
  state: StateType = {
    secondsLeft: 0,
    activeIndex: 0,
    activeColor: '',
    data: {},
  };

  handlePublishEvent = eventId => {
    this.props
      .publishEventMutation({
        variables: {
          eventId,
        },
        refetchQueries: [{ query: hostedEventsQuery }],
      })
      .then(() => {
        this.setState(() => ({
          confirmationDialogSubject: 'publish',
          confirmationDialogOpen: true,
          eventPublished: true,
        }));
        this.props.setEventSlug(this.props.eventSlug, this.props.published);
      })
      .catch(error => {
        console.error('there was an error mutating\n' + JSON.stringify(error));
      });
  };
  handleConfirmDismiss = () => {
    this.setState({ confirmationDialogOpen: false });
  };
  handleView = () => {
    return history.push(`/event/${this.props.eventSlug}`);
  };
  renderDialog = () => {
    let title, description, handleConfirm, handleSecondary, secondaryLabel, warning;

    switch (this.state.confirmationDialogSubject) {
      case 'publish':
        title = 'Event Published';
        description = 'Congratulations! Your event has been published.';
        warning = null;
        handleSecondary = this.handleView;
        secondaryLabel = 'View';
        handleConfirm = this.handleConfirmDismiss;
        break;
      default:
        title = 'Cancel event';
        description = (
          <DialogContentText>
            To cancel an event please send us an email at{' '}
            <a
              style={{ color: '#00aeef' }}
              href="mailto:contact@eventhi.io?subject=EventHi - Cancel Event"
            >
              contact@eventhi.io
            </a>
          </DialogContentText>
        );
        warning = null;
        handleSecondary = null;
        secondaryLabel = null;
        handleConfirm = this.handleConfirmDismiss;
        break;
    }
    return (
      <ConfirmationDialog
        title={title}
        description={description}
        warning={warning}
        noCancel
        confirmLabel="Continue"
        secondaryButton={handleSecondary}
        secondaryButtonLabel={secondaryLabel}
        open={this.state.confirmationDialogOpen}
        handleCancel={this.handleConfirmDismiss}
        handleConfirm={handleConfirm}
        handleSecondary={handleSecondary}
      />
    );
  };
  countTicketTotal = (ticketsRemaining, ticketsSold) => {
    const valuesArray = ticketsRemaining ? Object.values(ticketsRemaining) : [];

    if (valuesArray && valuesArray.length > 0) {
      const sum = valuesArray.reduce((a, b) => a + b, 0);

      return sum + Number(ticketsSold);
    }
  };

  render() {
    const { classes, eventSlug, eventId, published, data } = this.props;
    const { eventAnalytics, loading } = data;

    const ticketsSold = eventAnalytics ? eventAnalytics.ticketsSold : 0;
    const ticketsRemaining = eventAnalytics ? eventAnalytics.ticketsRemaining : 0;
    const sponsorshipsSold = eventAnalytics ? eventAnalytics.sponsorshipsSold : 0;
    const sponsorshipsRemaining = eventAnalytics
      ? eventAnalytics.sponsorshipsRemaining
      : 0;
    console.log(
      'sponsorshipsHide',
      sponsorshipsSold === 0 && isEmpty(sponsorshipsRemaining),
    );
    const secondsLeft = eventAnalytics ? eventAnalytics.secondsLeft : 0;
    const amountSold = eventAnalytics ? eventAnalytics.amountSold : 0;
    const sponsorshipsAmountSold = eventAnalytics
      ? eventAnalytics.sponsorshipsAmountSold
      : 0;

    const daysRemaining = eventAnalytics ? Math.floor(secondsLeft / 86400) : 0;
    const ticketTotal = eventAnalytics
      ? this.countTicketTotal(ticketsRemaining, ticketsSold)
      : 0;
    const sponsorshipsTotal = eventAnalytics
      ? this.countTicketTotal(sponsorshipsRemaining, sponsorshipsSold)
      : 0;
    const soldPercentage = eventAnalytics
      ? (Number(ticketsSold) / Number(ticketTotal)) * 100
      : 0;
    const sponsorshipsSoldPercentage = eventAnalytics
      ? (Number(sponsorshipsSold) / Number(sponsorshipsTotal)) * 100
      : 0;
    if (loading || !eventAnalytics) {
      return <h3>Loading...</h3>;
    } else if (!this.props.eventId) {
      return <h3>Please pick an event</h3>;
    }

    return (
      // <Gri className={theme.wrapper} style={{ flex: 1 }}>
      <div className={classes.root}>
        <Grid container spacing={24} justify="flex-start">
          {ticketsSold === 0 && isEmpty(ticketsRemaining) ? null : (
            <Grid item xs={12} md={6} lg={4}>
              <StatsCard
                icon="Ticket"
                iconColor="orange"
                title="Tickets"
                small="Sold"
                description={`${ticketsSold} / ${ticketTotal}`}
                disabled
                statIcon="Ticket"
                statIconColor="#fb8c00"
                statLink={{ text: 'View Atendees', url: '/dashboard/attendees' }}
                visualAid={
                  <LinearProgress
                    variant="determinate"
                    value={soldPercentage}
                    classes={{ bar: classes.bar, colorPrimary: classes.colorPrimary }}
                    style={{ marginTop: 15 }}
                  />
                }
              />
            </Grid>
          )}
          {sponsorshipsSold === 0 && isEmpty(sponsorshipsRemaining) ? null : (
            <Grid item xs={12} md={6} lg={4}>
              <StatsCard
                icon="Store"
                iconColor="orange"
                title="Sponsorships"
                small="Sold"
                description={`${sponsorshipsSold} / ${sponsorshipsTotal}`}
                disabled
                statIcon="MultipleUsersOutlined"
                statIconColor="#fb8c00"
                statLink={{ text: 'View Sponsorships', url: '/dashboard/sponsorships' }}
                visualAid={
                  <LinearProgress
                    variant="determinate"
                    value={sponsorshipsSoldPercentage}
                    classes={{ bar: classes.bar, colorPrimary: classes.colorPrimary }}
                    style={{ marginTop: 15 }}
                  />
                }
              />
            </Grid>
          )}
          <Grid item xs={12} md={6} lg={4}>
            <StatsCard
              icon="Dollar"
              iconColor="green"
              title="Revenue"
              description={`$${formatNumber(amountSold + sponsorshipsAmountSold, 2)}`}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <StatsCard
              icon="CalendarClock"
              iconColor="purple"
              title="Time to Event"
              small="Days"
              description={daysRemaining}
              statIcon={published ? 'ViewEvent' : 'Publish'}
              statIconColor="#8e24aa"
              eventId={eventId}
              published={published}
              statLink={{
                text: published ? 'View Event' : 'Publish Event',
                url: `/event/${eventSlug}`,
                publishAction: this.handlePublishEvent,
              }}
            />
          </Grid>
        </Grid>
        {this.renderDialog()}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  eventId: state.event.dashboardEvent.eventId,
  eventSlug: state.event.dashboardEventSlug.eventSlug,
  published: state.event.dashboardEventSlug.published,
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  graphql(publishEventMutation, { name: 'publishEventMutation' }),
  graphql(eventAnalyticsQuery, {
    options: ({ eventId }) => ({
      fetchPolicy: 'network-only',
      variables: { id: eventId },
    }),
  }),
)(DashboardAnalyticsSection);

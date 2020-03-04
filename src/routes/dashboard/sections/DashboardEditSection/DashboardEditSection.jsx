//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import theme from './DashboardEditSection.css';
import { connect } from 'react-redux';
import history from 'localHistory';
import serialize from 'serialize-javascript';
import { graphql, compose } from 'react-apollo';
import EventForm from 'components/EventForm';
import eventFormInitialDataQuery from './eventFormInitialData.graphql';
import AnimatedCheckmark from 'components/animations/AnimatedCheckmark';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createEventValues } from 'settings';
import editEventMutation from './editEvent.graphql';
import hostedEventsQuery from 'routes/dashboard/hostedEvents.graphql';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { setEventFormStep } from 'actions/eventForm/eventFormStep';
import { setEventFormTicket } from 'actions/eventForm/eventFormTicket';
import { setEventFormErrors } from 'actions/eventForm/eventFormErrors';
import redirectToError from 'helpers/redirectToError';
import detectErrors from 'helpers/detectErrors';
import { isRelease } from 'settings';

type Props = {
  eventId: number,
};

type State = {};

class DashboardEditSection extends Component<Props, State> {
  state: State = {
    dialogOpen: false,
    errors: {},
  };
  props: Props;

  handleFinish = data =>
    this.props
      .mutate({
        variables: {
          body: serialize(data, { isJSON: true }),
          eventId: this.props.eventId,
          idempotencyKey: Math.floor(Math.random() * 1e17).toString(),
        },
        refetchQueries: [
          { query: hostedEventsQuery },
          {
            query: eventFormInitialDataQuery,
            variables: { id: this.props.eventId },
          },
        ],
      })
      .then(result => {
        const errors = result ? result.data.editEvent._error : null;

        if (errors && errors.status > 200) {
          const parsedJSON = JSON.parse(errors.body);
          console.log('ERROR?', parsedJSON.errors);
          detectErrors(parsedJSON.errors, this.props.setEventFormErrors);
          redirectToError(
            parsedJSON.errors,
            this.props.setEventFormStep,
            this.props.setEventFormTicket,
          );
          this.setState(() => ({ errors: parsedJSON.errors }));
        } else {
          this.setState(() => ({ dialogOpen: true }));
          isRelease && window
            ? window.ga('send', 'event', 'Event', 'Edit', this.props.email)
            : null;
          return new Promise(resolve => {
            resolve(this.props.eventId);
          });
        }
      })
      .catch(error => {
        console.log('ERROR?', error);
      });
  handleCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };
  render() {
    const { dialogOpen } = this.state;
    const { eventSlug } = this.props;

    if (!this.props.eventId) {
      return <h3>Please pick an event</h3>;
    } else if (this.props.data.loading) {
      return <h3>Loading...</h3>;
    }

    // TODO: For the love of god rename this to initialValues
    let initialData = this.props.data.eventFormInitialData;
    console.log('this.state.errors in dashboard edit', this.state.errors.general);
    return (
      <div style={{ flex: 1 }}>
        <EventForm
          formSuffix="Edit"
          initialValues={initialData}
          finishLabel="Save"
          handleFinish={this.handleFinish}
          errors={this.state.errors}
        />
        <Dialog open={dialogOpen} onClose={this.handleCloseDialog}>
          <DialogTitle style={{ textAlign: 'center' }}>Event Updated</DialogTitle>
          <DialogContent>
            <AnimatedCheckmark />
            <Typography>Congratulations! You have updated your event.</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" onClick={() => history.push(`/event/${eventSlug}`)}>
              View
            </Button>
            <Button color="primary" onClick={() => this.setState({ dialogOpen: false })}>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  eventId: state.event.dashboardEvent.eventId,
  eventSlug: state.event.dashboardEventSlug.eventSlug,
  email: state.auth.email,
});

const mapDispatchToProps = dispatch => {
  return {
    setEventFormStep: step => {
      dispatch(setEventFormStep(step));
    },
    setEventFormTicket: state => {
      dispatch(setEventFormTicket(state));
    },
    setEventFormErrors: state => {
      dispatch(setEventFormErrors(state));
    },
  };
};

export default compose(
  withStyles(theme),
  graphql(editEventMutation),
  connect(mapStateToProps, mapDispatchToProps),
  graphql(eventFormInitialDataQuery, {
    options: data => ({
      variables: { id: data.eventId },
      fetchPolicy: 'network-only',
    }),
  }),
)(DashboardEditSection);

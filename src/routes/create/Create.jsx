//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import serialize from 'serialize-javascript';
import theme from './Create.css';
import history from 'localHistory';
import EventForm from 'components/EventForm';
import { reset, change } from 'redux-form';
import publishEventMutation from '../dashboard/publishEvent.graphql';
import { graphql, compose } from 'react-apollo';
import createEventMutation from './createEvent.graphql';
import { connect } from 'react-redux';
import { setEventId } from 'actions/event';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AnimatedCheckmark from 'components/animations/AnimatedCheckmark';
import { setEventFormStep } from 'actions/eventForm/eventFormStep';
import { setEventFormTicket } from 'actions/eventForm/eventFormTicket';
import { setEventFormErrors } from 'actions/eventForm/eventFormErrors';
import redirectToError from 'helpers/redirectToError';
import detectErrors from 'helpers/detectErrors';
import { isRelease } from 'settings';
import moment from 'moment-timezone';

type Props = {};

type State = {
  openCongrats: boolean,
};

class Create extends React.Component<Props, State> {
  state: State = {
    openCongrats: false,
    errors: {},
  };
  props: Props;

  handleCloseDialog = () => {
    this.setState({ openCongrats: false });
  };

  resetForms = forms => {
    if (forms.length > 0) forms.map(form => this.props.resetForm(form));
  };

  handleFinish = data => {
    const createForms = [
      'generalFormCreate',
      'scheduleFormCreate',
      'locationFormCreate',
      // 'mediaFormCreate',
      'ticketFormCreate',
      'refundsFormCreate',
    ];
    return this.props
      .mutate({
        variables: {
          body: serialize(data, { isJSON: true }),
          idempotencyKey: Math.floor(Math.random() * 1e17).toString(),
        },
      })
      .then(result => {
        const errors = result ? result.data.createEvent._error : null;
        this.props.setEventId(result.data.createEvent.id);
        if (errors) this.setState({ errors: JSON.parse(errors.body).errors });

        console.log('err in Create.jsx: ', this.state.errors);

        if (errors === null) {
          this.setState(() => ({ openCongrats: true }));
          this.resetForms(createForms);
          this.props.changeField('promoteFormCreate', 'categories', []);
          this.props.changeField('promoteFormCreate', 'organizerWebsite', null);
          this.props.changeField('promoteFormCreate', 'organizerFacebook', null);
          this.props.changeField('promoteFormCreate', 'organizerTwitter', null);
          this.props.changeField('promoteFormCreate', 'organizerInstagram', null);
          isRelease && window
            ? window.ga('send', 'event', 'Event', 'Create', this.props.email)
            : null;

          return new Promise(resolve => {
            resolve(this.props.eventId);
          });
        }
        detectErrors(this.state.errors, this.props.setEventFormErrors);
        redirectToError(
          this.state.errors,
          this.props.setEventFormStep,
          this.props.setEventFormTicket,
        );
      })
      .catch(error => console.error(error));
  };

  handleConfirmPublishEvent = eventId => {
    this.props
      .publishEventMutation({
        variables: {
          eventId,
        },
      })
      .then(() => {
        if (window) return (window.location = '/');
      })
      .catch(error => {
        console.error(`there was an error mutating\n${error}`);
      });
  };
  render() {
    const dialogStyles = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    };

    return this.props.authenticated ? (
      <div style={{ flex: 1 }}>
        <h1 className={theme.title}>Create</h1>
        <hr className={theme.hr} />
        <EventForm
          errors={this.state.errors}
          formSuffix="Create"
          finishLabel="Create"
          handleFinish={this.handleFinish}
        />

        <Dialog open={this.state.openCongrats} onClose={this.handleCloseDialog}>
          <DialogTitle style={{ textAlign: 'center' }}>Event Created</DialogTitle>
          <DialogContent>
            <AnimatedCheckmark />
            <Typography>Congratulations! You have created an event.</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              color="inherit"
              onClick={() => (window ? (window.location = '/') : null)}
            >
              Manage
            </Button>
            <Button
              color="primary"
              onClick={() => this.handleConfirmPublishEvent(this.props.eventId)}
            >
              Publish
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : (
      <div />
    );
  }
}
const mapStateToProps = state => ({
  eventId: state.event.dashboardEvent.eventId,
  authenticated: state.auth.authenticated,
  email: state.auth.email,
});

const mapDispatchToProps = dispatch => {
  return {
    // This will be passed as a property to this component
    resetForm: form => {
      dispatch(reset(form));
    },
    changeField: (form, field, value) => {
      dispatch(change(form, field, value));
    },
    setEventId: id => {
      dispatch(setEventId(id));
    },
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
  graphql(createEventMutation),
  graphql(publishEventMutation, { name: 'publishEventMutation' }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Create);

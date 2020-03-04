//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import refundTicketMutation from './refundTicket.graphql';

type Props = {
  eventId: number,
};

type State = {
  ticketNumber: string,
  subject: string,
  message: string,
};

class DashboardRefundsSection extends Component<Props, State> {
  state: State = {
    ticketNumber: '',
    subject: '',
    message: '',
  };

  props: Props;

  handleFieldChange = (field, e) => {
    this.setState({ [field]: e.currentTarget.value });
  };

  handleReturn = () => {
    let { ticketNumber, subject, message } = this.state;
    return this.props
      .mutate({
        variables: {
          ticketNumber,
          subject,
          message,
        },
      })
      .then(result => {
        alert('Ticket returned!');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (!this.props.eventId) {
      return <h3>Please pick an event</h3>;
    }
    return (
      <div>
        <TextField
          autoFocus
          required
          id="ticketNumber"
          label="Ticket number"
          margin="normal"
          underlineStyle={{ borderColor: '#424242' }}
          underlineFocusStyle={{ borderColor: '#424242' }}
          floatingLabelStyle={{ color: '#424242 !important' }}
          floatingLabelFocusStyle={{ color: '#424242' }}
          inputStyle={{ color: '#424242' }}
          onChange={e => this.handleFieldChange('ticketNumber', e)}
          value={this.state.ticketNumber}
        />
        <br />
        <TextField
          name="subject"
          label="Subject"
          margin="normal"
          underlineStyle={{ borderColor: '#424242' }}
          underlineFocusStyle={{ borderColor: '#424242' }}
          floatingLabelStyle={{ color: '#424242 !important' }}
          floatingLabelFocusStyle={{ color: '#424242' }}
          inputStyle={{ color: '#424242' }}
          onChange={e => this.handleFieldChange('subject', e)}
          value={this.state.subject}
        />
        <br />
        <TextField
          name="message"
          label="Message"
          margin="normal"
          underlineStyle={{ borderColor: '#424242' }}
          underlineFocusStyle={{ borderColor: '#424242' }}
          floatingLabelStyle={{ color: '#424242 !important' }}
          floatingLabelFocusStyle={{ color: '#424242' }}
          inputStyle={{ color: '#424242' }}
          onChange={e => this.handleFieldChange('message', e)}
          value={this.state.message}
        />
        <br />
        <Button color="primary" onClick={this.handleReturn}>
          Submit
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  eventId: state.event.dashboardEvent.eventId,
  form: 'refunds',
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  graphql(refundTicketMutation),
  // graphql(eventTicketsQuery, {
  //   options: ({ eventId }) => ({
  //     fetchPolicy: 'network-only',
  //     variables: { id: eventId },
  //   }),
  // }),
)(DashboardRefundsSection);

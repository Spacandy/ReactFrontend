//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Svg from 'components/Svg';
import resendOrderConfirmationQuery from './resendOrderConfirmation.graphql';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { formatNumber, capitalize } from 'data/utils';
type Props = {
  expanded: boolean,
  onChange: Function,
  classes: {
    heading: {},
    secondaryHeading: {},
  },
  ticket: {
    eventName: string,
    startDate: string,
    price: string,
    transactionId: string,
    type: string,
    status: string,
    description: string,
  },
};

class Item extends React.Component<Props, State> {
  state: State = {
    dialogOpen: false,
    dialogStatus: '',
  };
  onResendOrderClick = () => {
    this.props.client
      .query({
        query: resendOrderConfirmationQuery,
        variables: { transactionId: this.props.ticket.transactionId },
        fetchPolicy: 'network-only',
      })
      .then(response => {
        this.setState({
          dialogOpen: true,
          dialogStatus: response.data.resendOrderConfirmationEmail.status,
        });
      });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    return [
      <ExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange}>
        <ExpansionPanelSummary expandIcon={<Svg icon="ChevronDown" color="#424242" />}>
          <Typography className={this.props.classes.heading}>
            <Svg
              icon={this.props.icon}
              color={this.props.expanded ? '#00aeef' : 'rgba(0, 0, 0, 0.54)'}
              style={{ margin: '0 10px -6px 0' }}
            />
            {this.props.ticket.eventName} - {this.props.ticket.description}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: 'block' }}>
          <Typography className={this.props.classes.secondaryHeading}>
            Event Date: {this.props.ticket.startDate}
          </Typography>
          <br />
          <Typography className={this.props.classes.secondaryHeading}>
            Price: ${formatNumber(parseFloat(this.props.ticket.price))}
          </Typography>
          {this.props.ticket.type == 'sponsorship' && [
            <br />,
            <Typography className={this.props.classes.secondaryHeading}>
              Status:{' '}
              <span
                style={{
                  color:
                    this.props.ticket.status === 'cancelled'
                      ? '#f44336'
                      : this.props.ticket.status === 'pending'
                        ? '#ff9800'
                        : '#357a38',
                }}
              >
                {capitalize(this.props.ticket.status)}
              </span>
            </Typography>,
          ]}
          {this.props.ticket.type == 'ticket' && (
            <Button
              style={{ width: '100%', marginTop: 20 }}
              onClick={this.onResendOrderClick}
              variant="raised"
            >
              Resend Order Confirmation
            </Button>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>,
      <Dialog
        fullScreen={this.props.fullScreen}
        open={this.state.dialogOpen}
        onClose={this.handleClose}
      >
        <DialogContent>
          <Typography variant="subheading">{this.state.dialogStatus}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>,
    ];
  }
}

export default compose(
  withApollo,
  withMobileDialog(),
)(Item);

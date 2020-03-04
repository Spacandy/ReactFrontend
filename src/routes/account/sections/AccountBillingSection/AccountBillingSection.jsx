//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import history from 'localHistory';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import serialize from 'serialize-javascript';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import { states } from 'states.js';

import { setPurchaseTicketModalState } from 'actions/modals/purchaseTicketsModal';

import editBillingData from './editBillingData.graphql';
import billingDataQuery from './billingDataQuery.graphql';

type Props = {
  client: {
    query: Function,
  },
  mutate: Function,
  referredFromTicket: boolean,
  dispatch: Dispatch,
  tickets: {},
};

type State = {
  done: boolean,
  address1: string,
  city: string,
  state: string,
  zipcode: string,
  country: string,
  popperOpen: boolean,
  errors: {
    address1: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
  },
};

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
  },
  popover: {
    pointerEvents: 'none',
  },
  popperClose: {
    pointerEvents: 'none',
  },
});

class AccountBillingSection extends Component<Props, State> {
  state: State = {
    done: false,
    address1: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    anchorEl: null,
    errors: {
      address1: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
    },
  };

  componentDidMount = () => {
    this.props.client
      .query({
        query: billingDataQuery,
        fetchPolicy: 'network-only',
      })
      .then(response => {
        const { address1, city, state, zipcode, country } = response.data.billingData;
        this.setState({
          address1,
          city,
          state,
          zipcode,
          country,
        });
      });
  };

  props: Props;

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleEnter = event => {
    if (event.which === 13) {
      this.handleSubmit();
    }
  };

  handlePopoverOpen = event => {
    // we only do this for text type to prevent it from anchoring to label with return undefined for type
    if (event.target.type === 'text') this.setState({ anchorEl: event.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSubmit = () => {
    this.props
      .mutate({
        variables: {
          address1: this.state.address1,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          country: 'United States',
        },
      })
      .then(graphqlResponse => graphqlResponse.data.editBillingData)
      .then(data => {
        if (data.errors) {
          this.setState({ errors: data.errors });
        } else {
          this.setState({
            done: true,
            errors: {},
          });
          if (this.props.referredFromTicket) {
            history.push('/');
            this.props.dispatch(
              setPurchaseTicketModalState(
                true,
                null,
                this.props.tickets,
                this.props.timezone,
              ),
            );
          }
        }
      })
      .catch(error => {
        console.error(
          `Error submitting request\n' ${serialize(error, { isJSON: true })}`,
        );
      });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = !!anchorEl;
    console.log('anchorEl: ', anchorEl);
    return (
      <div>
        {this.state.done ? <h2>Billing Address updated successfully!</h2> : null}

        <TextField
          id="streetAddress"
          label="Street Address"
          required
          onKeyDown={this.handleEnter}
          onChange={this.handleChange('address1')}
          value={this.state.address1}
          errorText={this.state.errors.address1}
          margin="normal"
        />

        <br />
        <TextField
          id="addressLocality"
          label="City"
          required
          onKeyDown={this.handleEnter}
          onChange={this.handleChange('city')}
          value={this.state.city}
          errorText={this.state.errors.city}
          margin="normal"
        />

        <br />
        <FormControl style={{ minWidth: 167 }} margin="normal">
          <InputLabel required htmlFor="addressRegion">
            State
          </InputLabel>
          <Select
            value={this.state.state}
            onChange={this.handleChange('state')}
            errorText={this.state.errors.state}
            required
            inputProps={{
              name: 'addressRegion',
              id: 'addressRegion',
            }}
          >
            {states.map(s => (
              <MenuItem selected={s === this.state.addressRegion} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <br />
        <TextField
          id="postalCode"
          label="Zipcode"
          required
          onKeyDown={this.handleEnter}
          onChange={this.handleChange('zipcode')}
          value={this.state.zipcode}
          errorText={this.state.errors.zipcode}
          margin="normal"
        />

        <br />
        <TextField
          id="addressRegion"
          label="Country"
          required
          onMouseOver={this.handlePopoverOpen}
          onMouseOut={this.handlePopoverClose}
          onFocus={this.handlePopoverOpen}
          onBlur={this.handlePopoverClose}
          errorText={this.state.errors.zipcode}
          value="United States"
          disabled
          margin="normal"
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handlePopoverClose}
        >
          <Typography>
            At this time only United States addresses are permitted.
          </Typography>
        </Popover>
        <br />
        <Button color="primary" variant="raised" onClick={this.handleSubmit}>
          Submit
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.modals.purchaseTicketsModal.availableTickets,
  timezone: state.modals.purchaseTicketsModal.timezone,
  referredFromTicket: state.modals.billingRequiredModal.referredFromTicket,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default compose(
  withStyles(styles),
  graphql(editBillingData),
  connect(mapStateToProps, mapDispatchToProps),
  withApollo,
)(AccountBillingSection);

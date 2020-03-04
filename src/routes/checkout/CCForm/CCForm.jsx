//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import history from 'localHistory';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Helpers
import processErrors from 'helpers/errors/processErrors';

import BillingInfo from '../CheckoutBillingInfo';

import CCIcons from './CCIcons';
import CreditCard from './CreditCard';
import cardTypes from './cardTypes';

// Data
import purchaseTicketsMutation from './purchaseTickets.graphql';

// Types
import type { Props, State } from './types';

// Styles
import stylesGenerator from './styles';

const styles = stylesGenerator();

class CCForm extends Component<Props, State> {
  state: State = {
    streetAddress: '',
    addressLocality: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: 'United States',
    month: '',
    year: '',
    forteMessage: '',
    parsedErrors: {
      streetAddress: null,
      addressLocality: null,
      addressRegion: null,
      addressCountry: null,
      postalCode: null,
      number: null,
      first: null,
      last: null,
      month: null,
      year: null,
      cvv: null,
      serverMessage: null,
    },
    focused: null,
    canBuy: true,
    cardType: '',
    numberLength: 0,
    cvvLength: 0,
    activeStep: 0,
    isValidNumber: false,
    fullName: '',
  };

  componentDidMount() {
    if (this.props.mode === 'ticket') this.initializeCC(process.env.SPREEDLY_KEY);
    //   const message = 'Are you sure you want to leave this page?';

    //   // this transition block tries to use the default browser dialogs
    //   window.onbeforeunload = () => message;
    //   // this is named 'unblock' because it returns a function to remove the block applied below
    //   this.unblock = history.block(message);
  }

  // componentWillUnmount = () => {
  //   window.onbeforeunload = () => {
  //     // blank function to overwrite no longer needer transition block
  //     // this is the reccomended bethod to undo unbeforereload re: https://stackoverflow.com/a/6288421
  //   };
  //   return this.unblock();
  // };

  props: Props;

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      parsedErrors: {
        ...this.state.parsedErrors,
        [name]: '',
      },
    });
  };

  handleFocusChange = value => this.setState(() => ({ focused: value }));

  initializeCC = key => {
    /* eslint-disable no-undef */
    Spreedly.init(key, {
      numberEl: 'spreedly-number',
      cvvEl: 'spreedly-cvv',
    });

    Spreedly.on('ready', () => {
      Spreedly.setFieldType('number', 'text');
      Spreedly.setNumberFormat('prettyFormat');
      Spreedly.setStyle('cvv', 'width: 60px; height: 28px; font-size: 15px;');
      return Spreedly.setStyle('number', 'width: 100%; height: 28px; font-size: 15px;');
    });

    Spreedly.on('paymentMethod', token => {
      // Set the token in the hidden form field
      const tokenField = document.getElementById('payment_method_token');
      if (tokenField !== null) {
        tokenField.setAttribute('value', token);
      }

      return this.processTransaction(
        this.props.selectedItems,
        this.props.quantity,
        token,
      );
    });

    Spreedly.on('fieldEvent', (name, type, activeEl, inputProperties) => {
      if (Object.prototype.hasOwnProperty.call(inputProperties, 'cardType')) {
        cardTypes.map(cardType => {
          if (inputProperties.cardType === cardType.unprocessedName) {
            return this.setState(() => ({ cardType: cardType.processedName }));
          }
        });
      }
      this.initializeMetadataListeners(inputProperties);
      return this.initializeFocusListeners(name, type);
    });

    Spreedly.on('errors', errors => {
      this.setState(() => ({ canBuy: true }));
      return this.parseErrors(errors, this.state);
    });
    /* eslint-enable no-undef */
  };

  initializeMetadataListeners = inputProperties => {
    const metadataFields = ['numberLength', 'cvvLength', 'validNumber'];
    return metadataFields.map(metaField => {
      if (Object.prototype.hasOwnProperty.call(inputProperties, metaField)) {
        this.setState(() => ({ [metaField]: inputProperties[metaField] }));
      }
    });
  };

  initializeFocusListeners = (name, type) => {
    const fields = [
      { unprocessedName: 'number', processedName: 'number' },
      { unprocessedName: 'cvv', processedName: 'cvc' },
    ];

    fields.map(fieldName => {
      if (type === 'focus' && name === fieldName.unprocessedName) {
        this.setState(() => ({ focused: fieldName.processedName }));
      }
      if (type === 'blur' && (name === 'cvv' || name === 'number')) {
        this.setState(() => ({ focused: null }));
      }
      if (type === 'input') {
        this.setState(prevState => ({
          parsedErrors: { ...prevState.parsedErrors, [name]: null },
        }));
      }
      return fieldName;
    });
  };

  submitPaymentForm = () => {
    const requiredFields = {};
    this.setState(() => ({ canBuy: false }));
    // Get required, non-sensitive values
    requiredFields.full_name = document.getElementById('full_name').value;
    requiredFields.month = document.getElementById('cc_month').value;
    requiredFields.year = `20${document.getElementById('cc_year').value}`;
    requiredFields.email = this.props.user.email;
    requiredFields.address1 = this.state.streetAddress;
    requiredFields.city = this.state.addressLocality;
    requiredFields.state = this.state.addressRegion;
    requiredFields.zip = this.state.postalCode;
    requiredFields.country = this.state.addressCountry;

    return Spreedly.tokenizeCreditCard(requiredFields); // eslint-disable-line no-undef
  };

  processTransaction = (selectedItems, quantity, token) => {
    const spreedlyToken = token;
    const idempotencyKey = Math.floor(Math.random() * 1e17).toString();

    return this.props
      .mutate({
        variables: {
          selectedItems,
          spreedlyToken,
          idempotencyKey,
        },
      })
      .then(({ data }) => {
        if (data.purchaseTickets.data && data.purchaseTickets.data.succeeded === false) {
          this.setState(() => ({
            canBuy: true,
            forteMessage: data.purchaseTickets.data.message,
          }));
        }

        if (data.purchaseTickets.error !== null)
          this.setState(prevState => ({
            canBuy: true,
            parsedErrors: {
              ...prevState.parsedErrors,
              serverMessage: data.purchaseTickets.error,
            },
          }));

        if (data.purchaseTickets.data.succeeded === true) {
          this.setState(() => ({ canBuy: true }));
          return history.push('/orders');
        }
      })
      .catch(error => console.error(error));
  };

  parseErrors = (ccErrors, state) => {
    if (ccErrors) {
      ccErrors.map(e => {
        if (e.attribute === 'number') {
          this.setState(prevState => ({
            parsedErrors: { ...prevState.parsedErrors, number: e.message },
          }));
        }
        if (e.attribute === 'month') {
          this.setState(prevState => ({
            parsedErrors: { ...prevState.parsedErrors, month: e.message },
          }));
        }
        if (e.attribute === 'year') {
          this.setState(prevState => ({
            parsedErrors: { ...prevState.parsedErrors, year: e.message },
          }));
        }
        if (e.attribute === 'first_name') {
          this.setState(prevState => ({
            parsedErrors: { ...prevState.parsedErrors, first: e.message },
          }));
        }
        if (e.attribute === 'last_name') {
          this.setState(prevState => ({
            parsedErrors: { ...prevState.parsedErrors, last: e.message },
          }));
        }
      });
    }

    if (state.streetAddress === null) {
      this.setState(prevState => ({
        parsedErrors: {
          ...prevState.parsedErrors,
          streetAddress: 'This field is required',
        },
      }));
    }
    if (state.addressLocality === null) {
      this.setState(prevState => ({
        parsedErrors: {
          ...prevState.parsedErrors,
          addressLocality: 'This field is required',
        },
      }));
    }
    if (state.addressRegion === null) {
      this.setState(prevState => ({
        parsedErrors: {
          ...prevState.parsedErrors,
          addressRegion: 'This field is required',
        },
      }));
    }
    if (state.postalCode === null) {
      this.setState(prevState => ({
        parsedErrors: {
          ...prevState.parsedErrors,
          postalCode: 'This field is required',
        },
      }));
    }
    if (state.addressCountry === null) {
      this.setState(prevState => ({
        parsedErrors: {
          ...prevState.parsedErrors,
          addressCountry: 'This field is required',
        },
      }));
    }
  };

  render() {
    const { classes, eventData } = this.props;

    const {
      canBuy,
      parsedErrors,
      streetAddress,
      addressLocality,
      addressRegion,
      addressCountry,
      postalCode,
      forteMessage,
    } = this.state;

    const ccRef = React.createRef();

    return (
      <div>
        <BillingInfo
          classes={classes}
          parsedErrors={parsedErrors}
          processErrors={processErrors}
          streetAddress={streetAddress}
          handleChange={this.handleChange}
          addressLocality={addressLocality}
          addressRegion={addressRegion}
          postalCode={postalCode}
          addressCountry={addressCountry}
        />
        <Typography
          variant="headline"
          style={{ paddingTop: 30, textAlign: 'center', marginBottom: 16 }}
          key="0"
        >
          Payment Information
        </Typography>
        <CreditCard
          number={'*'.repeat(this.state.numberLength)}
          name={this.state.fullName}
          expiry={`${this.state.month}/${this.state.year}`}
          cvc={'*'.repeat(this.state.cvvLength)}
          focused={this.state.focused}
          isValidNumber={this.state.isValidNumber}
          issuer={this.state.cardType}
        />
        <div className={classes.ccFormWrapper}>
          <input type="hidden" name="payment_method_token" id="payment_method_token" />
          <label
            style={{
              color:
                parsedErrors.first || parsedErrors.last
                  ? '#F74337'
                  : 'rgba(0, 0, 0, 0.54)',
              fontSize: '.75rem',
            }}
            htmlFor="full_name"
          >
            Name *
            <br />
            <input
              style={{
                borderStyle: 'none',
                borderBottom:
                  parsedErrors.first || parsedErrors.last
                    ? '1px solid #F74337'
                    : '1px solid rgba(0, 0, 0, 0.42)',
                width: '100%',
                height: 28,
                fontSize: 15,
                transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                outline: 'none',
              }}
              variant="text"
              id="full_name"
              name="full_name"
              onFocus={() => this.handleFocusChange('name')}
              onBlur={() => this.handleFocusChange(null)}
              onChange={({ target }) =>
                this.setState(prevState => ({
                  fullName: target.value,
                  parsedErrors: {
                    ...prevState.parsedErrors,
                    first: '',
                    last: '',
                  },
                }))
              }
            />
          </label>
          {processErrors(parsedErrors.first, true)}
          {processErrors(parsedErrors.last, true)}
          <br />
          <br />
          <label
            style={{
              color: parsedErrors.number ? '#F74337' : 'rgba(0, 0, 0, 0.42)',
              fontSize: '.75rem',
            }}
            htmlFor="full_name"
          >
            Credit Card Number *
            <div
              id="spreedly-number"
              style={{
                width: '100%',
                height: 28,
                fontSize: 15,
                left: 0,
                right: 0,
                bottom: 0,
                transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                borderBottom: parsedErrors.number
                  ? '1px solid #F74337'
                  : '1px solid rgba(0, 0, 0, 0.42)',
              }}
            />
          </label>
          {processErrors(parsedErrors.number, true)}
          <br />
          <div style={{ display: 'inline-flex' }}>
            <label
              style={{
                color:
                  parsedErrors.month || parsedErrors.year
                    ? '#F74337'
                    : 'rgba(0, 0, 0, 0.54)',
                fontSize: '.65rem',
                margin: '1.5px 0',
              }}
              htmlFor="exp"
            >
              Expiration Date *
              <br />
              <div>
                <input
                  variant="text"
                  style={{
                    borderStyle: 'none',
                    borderBottom: parsedErrors.month
                      ? '1px solid #F74337'
                      : '1px solid rgba(0, 0, 0, 0.42)',
                    height: 28,
                    width: 40,
                    fontSize: 15,
                    transition:
                      'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    outline: 'none',
                  }}
                  id="cc_month"
                  placeholder="MM"
                  name="cc_month"
                  maxLength="2"
                  type="number"
                  min="1"
                  max="12"
                  onChange={({ target }) => {
                    this.setState(prevState => ({
                      month: target.value,
                      parsedErrors: {
                        ...prevState.parsedErrors,
                        month: '',
                      },
                    }));
                    return target.value.length > 1 && ccRef.current.focus();
                  }}
                  onFocus={() => this.handleFocusChange('expiry')}
                  onBlur={() => this.handleFocusChange(null)}
                />

                <input
                  variant="text"
                  ref={ccRef}
                  style={{
                    borderStyle: 'none',
                    borderBottom: parsedErrors.year
                      ? '1px solid #F74337'
                      : '1px solid rgba(0, 0, 0, 0.42)',
                    height: 28,
                    fontSize: 15,
                    width: 40,
                    transition:
                      'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    outline: 'none',
                  }}
                  id="cc_year"
                  name="cc_year"
                  placeholder="YY"
                  maxLength="2"
                  onChange={({ target }) => {
                    return this.setState(prevState => ({
                      year: target.value,
                      parsedErrors: {
                        ...prevState.parsedErrors,
                        year: '',
                      },
                    }));
                  }}
                  onFocus={() => this.handleFocusChange('expiry')}
                  onBlur={() => this.handleFocusChange(null)}
                />
              </div>
            </label>

            <br />
            <label
              style={{
                color: parsedErrors.cvv ? '#F74337' : 'rgba(0, 0, 0, 0.54)',
                fontSize: '.75rem',
                margin: '1.5px 10px',
              }}
              htmlFor="spreedly-cvv"
            >
              CVC *
              <div
                id="spreedly-cvv"
                style={{
                  width: 70,
                  height: 28,
                  fontSize: 15,
                  transition:
                    'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                }}
              />
            </label>
          </div>
          {processErrors(parsedErrors.month, true)}
          {processErrors(parsedErrors.year, true)}
          {processErrors(parsedErrors.cvv, true)}
          <br />
          <br />
          <Typography style={{ marginBottom: 5 }}>
            By clicking on the purchase button, I accept the terms of service and have
            read the privacy policy. I agree that EventHi may share my information with
            the event organizer.
          </Typography>
          <CCIcons />
          <br />
          <br />
          {canBuy && processErrors(parsedErrors.serverMessage, true)}
          {canBuy && processErrors(forteMessage, true)}
          <Button
            onClick={() => this.submitPaymentForm()}
            variant="raised"
            style={{ float: 'right' }}
            disabled={!canBuy}
          >
            Purchase
            {!canBuy && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventData: state.checkout.eventData,
  selectedItems: state.checkout.selectedItems,
  mode: state.checkout.mode,
  quantity: state.checkout.quantity,
  user: {
    email: state.auth.email,
  },
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default compose(
  withStyles(styles),
  graphql(purchaseTicketsMutation),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(CCForm);

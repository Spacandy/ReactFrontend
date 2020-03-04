//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import history from 'localHistory';
import validators from 'us-bank-account-validator';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import processErrors from 'helpers/errors/processErrors';

import ACHAuthorizationText from './ACHAuthorizationText';
import BankForm from '../CheckoutBankForm';
import BillingInfo from '../CheckoutBillingInfo';
import purchaseSponsorshipsMutation from './purchaseSponsorships.graphql';

// Types
import type { Props, State } from './types';

class ACHForm extends React.Component<Props, State> {
  state: State = {
    streetAddress: '',
    addressLocality: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: 'United States',
    firstName: '',
    lastName: '',
    bankRoutingNumber: '',
    bankAccountNumber: '',
    bankAccountType: '',
    parsedErrors: {
      streetAddress: null,
      addressLocality: null,
      addressRegion: null,
      addressCountry: null,
      postalCode: null,
      firstName: null,
      lastName: null,
      bankRoutingNumber: null,
      bankAccountNumber: null,
      bankAccountType: null,
    },
  };

  props: Props;

  validateField = (key, value) => {
    // Check if value is truthy
    if (value) {
      // If value is truthy check that it exists and length < 1 if it does check that its not a empty string
      if (value === null || value === undefined || value.length < 1) {
        this.setState(prevState => ({
          parsedErrors: {
            ...prevState.parsedErrors,
            [key]: 'Field is required',
          },
        }));
        // boolean used in validateFields()
        return true;
      }
      // If it is not a empty strung remove any error that existed
      this.setState(prevState => ({
        parsedErrors: {
          ...prevState.parsedErrors,
          [key]: null,
        },
      }));
      // boolean used in validateFields()
      return false;
    }
    // If no value field is required
    this.setState(prevState => ({
      parsedErrors: {
        ...prevState.parsedErrors,
        [key]: 'Field is required',
      },
    }));
    // boolean used in validateFields()
    return true;
  };

  validateFields = () => {
    const {
      parsedErrors,
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry,
      firstName,
      lastName,
      bankAccountType,
      bankAccountNumber,
      bankRoutingNumber,
    } = this.state;

    const addressValidation = this.validateField('streetAddress', streetAddress);
    const localityValidation = this.validateField('addressLocality', addressLocality);
    const regionValidation = this.validateField('addressRegion', addressRegion);
    const postalCodeValidation = this.validateField('postalCode', postalCode);
    const countryValidation = this.validateField('addressCountry', addressCountry);
    const firstNameValidation = this.validateField('firstName', firstName);
    const lastNameValidation = this.validateField('lastName', lastName);
    const accountTypeValidation = this.validateField('bankAccountType', bankAccountType);
    // https://github.com/braintree/us-bank-account-validator#validroutingnumbervalue-string-object
    const routingValidation = validators.routingNumber(bankRoutingNumber);
    // https://github.com/braintree/us-bank-account-validator#validaccountnumbervalue-string-object
    const accountValidation = validators.accountNumber(bankAccountNumber);

    if (!routingValidation.isValid) {
      this.setState(prevState => ({
        parsedErrors: {
          ...prevState.parsedErrors,
          bankRoutingNumber: 'Routing number is invalid',
        },
      }));
    } else {
      this.setState(prevState => ({
        parsedErrors: {
          ...prevState.parsedErrors,
          bankRoutingNumber: null,
        },
      }));
    }

    if (!accountValidation.isValid) {
      this.setState(prevState => ({
        parsedErrors: {
          ...prevState.parsedErrors,
          bankAccountNumber: 'Bank account number is invalid',
        },
      }));
    } else {
      this.setState(prevState => ({
        parsedErrors: {
          ...prevState.parsedErrors,
          bankAccountNumber: null,
        },
      }));
    }

    if (
      addressValidation ||
      localityValidation ||
      regionValidation ||
      postalCodeValidation ||
      countryValidation ||
      firstNameValidation ||
      lastNameValidation ||
      accountTypeValidation ||
      !routingValidation.isValid ||
      !accountValidation.isValid
    )
      return false;

    return true;
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      parsedErrors: {
        ...this.state.parsedErrors,
        [name]: '',
      },
    });
  };

  render() {
    const { classes, selectedItems } = this.props;

    const {
      parsedErrors,
      firstName,
      lastName,
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      bankAccountType,
      bankRoutingNumber,
      bankAccountNumber,
      addressCountry,
    } = this.state;

    const billingInfo = {
      firstName,
      lastName,
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
    };

    const accountInfo = {
      bankAccountType,
      bankRoutingNumber,
      bankAccountNumber,
    };

    const userInfo = {
      id: this.props.userInfo.id,
      email: this.props.userInfo.email,
    };

    return (
      <Mutation
        mutation={purchaseSponsorshipsMutation}
        onCompleted={data => {
          if (data.purchaseSponsorships !== null) return history.push('/orders');
        }}
      >
        {(purchaseSponsorships, { loading, data }) => (
          <Fragment>
            <BillingInfo
              addressCountry={addressCountry}
              addressLocality={addressLocality}
              addressRegion={addressRegion}
              classes={classes}
              handleChange={this.handleChange}
              parsedErrors={parsedErrors}
              postalCode={postalCode}
              processErrors={processErrors}
              streetAddress={streetAddress}
            />
            <BankForm
              bankAccountNumber={bankAccountNumber}
              bankAccountType={bankAccountType}
              bankRoutingNumber={bankRoutingNumber}
              fistName={firstName}
              handleChange={this.handleChange}
              lastName={lastName}
              parsedErrors={parsedErrors}
              processErrors={processErrors}
            />
            <ACHAuthorizationText />
            {loading && <p>Loading...</p>}
            {data &&
              data.purchaseSponsorships &&
              data.purchaseSponsorships.error &&
              processErrors(data.purchaseSponsorships.error, true)}
            <div style={{ marginBottom: 40 }}>
              <img
                src="https://d3rd29nk50moi4.cloudfront.net/photos/user/2018/08/15/153437405894368601.jpg"
                style={{ width: 120 }}
              />
            </div>
            <Button
              variant="raised"
              disabled={loading}
              onClick={() => {
                if (this.validateFields()) {
                  return purchaseSponsorships({
                    variables: {
                      items: selectedItems,
                      billingInfo,
                      accountInfo,
                      userInfo,
                    },
                  });
                }
                this.validateFields();
              }}
              style={{ float: 'right', marginTop: -40 }}
            >
              Finish
              {loading && (
                <CircularProgress size={24} className={classes.buttonProgress} />
              )}
            </Button>
          </Fragment>
        )}
      </Mutation>
    );
  }
}

const mapStateToProps = state => ({
  selectedItems: state.checkout.selectedItems,
});

export default connect(
  mapStateToProps,
  null,
)(ACHForm);

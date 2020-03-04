//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Fragment } from 'react';

import TextField from '@material-ui/core/TextField';

type Props = {};

const BankForm = (props: Props) => (
  <Fragment>
    <input
      style={{ display: 'none', visibility: 'hidden' }}
      name="environment_key"
      type="hidden"
      value="NfY9yaNvAr2YMVV4YgMxas7JweY"
    />

    <input
      style={{ display: 'none', visibility: 'hidden' }}
      name="payment_method_type"
      type="hidden"
      value="bank_account"
    />

    <TextField
      id="first_name"
      label="First"
      value={props.firstName}
      onChange={props.handleChange('firstName')}
      error={!!props.parsedErrors.firstName}
      helperText={props.processErrors(props.parsedErrors.firstName)}
      InputLabelProps={{
        shrink: true,
      }}
      required
      fullWidth
      margin="normal"
    />
    <TextField
      id="last_name"
      label="Last"
      value={props.lastName}
      error={!!props.parsedErrors.lastName}
      helperText={props.processErrors(props.parsedErrors.lastName)}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={props.handleChange('lastName')}
      required
      fullWidth
      margin="normal"
    />

    <TextField
      id="account_type"
      select
      required
      fullWidth
      label="Account Type"
      error={!!props.parsedErrors.bankAccountType}
      helperText={props.processErrors(props.parsedErrors.bankAccountType)}
      value={props.bankAccountType || ''}
      onChange={props.handleChange('bankAccountType')}
      InputLabelProps={{
        shrink: true,
      }}
      SelectProps={{
        native: true,
      }}
      margin="normal"
    >
      <option value="" />
      <option value="checking">Checking</option>
      <option value="savings">Savings</option>
    </TextField>
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <img
        style={{ width: '100%', maxWidth: 500 }}
        src="https://d3rd29nk50moi4.cloudfront.net/routing_number.jpg"
      />
    </div>
    <TextField
      id="bank_routing_number"
      label="Routing Number"
      value={props.bankRoutingNumber}
      error={!!props.parsedErrors.bankRoutingNumber}
      helperText={props.processErrors(props.parsedErrors.bankRoutingNumber)}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={props.handleChange('bankRoutingNumber')}
      required
      fullWidth
      margin="normal"
    />
    <TextField
      id="bank_account_number"
      label="Account Number"
      value={props.bankAccountNumber}
      error={!!props.parsedErrors.bankAccountNumber}
      helperText={props.processErrors(props.parsedErrors.bankAccountNumber)}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={props.handleChange('bankAccountNumber')}
      required
      fullWidth
      margin="normal"
    />

    <br />
    <br />
  </Fragment>
);

export default BankForm;

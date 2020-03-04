//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Fragment } from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { states } from 'states';

type Props = {
  classes: {
    typographyRoot: {},
  },
  parsedErrors: {
    streetAddress: string,
    addressLocality: string,
    addressRegion: string,
    postalCode: string,
    addressCountry: string,
  },
  streetAddress: string,
  handleChange: Function,
  addressLocality: string,
  addressRegion: string,
  postalCode: string,
  addressCountry: string,
};

const CheckoutBillingInfo = (props: Props) => (
  <Fragment>
    <Typography
      variant="headline"
      style={{ paddingTop: 30 }}
      classes={{ root: props.classes.typographyRoot }}
      key="0"
    >
      Billing Information
    </Typography>
    <div>
      <TextField
        id="streetAddress"
        label="Street Address"
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        error={!!props.parsedErrors.streetAddress}
        helperText={props.processErrors(props.parsedErrors.streetAddress)}
        value={props.streetAddress}
        onChange={props.handleChange('streetAddress')}
        margin="normal"
      />
      <TextField
        id="addressLocality"
        label="City"
        required
        error={!!props.parsedErrors.addressLocality}
        helperText={props.processErrors(props.parsedErrors.addressLocality)}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        inputProps={{ name: 'addressLocality' }}
        value={props.addressLocality}
        onChange={props.handleChange('addressLocality')}
        margin="normal"
      />

      <TextField
        id="addressRegion"
        select
        required
        fullWidth
        error={!!props.parsedErrors.addressRegion}
        helperText={props.processErrors(props.parsedErrors.addressRegion)}
        label="State"
        value={props.addressRegion || ''}
        onChange={props.handleChange('addressRegion')}
        InputLabelProps={{
          shrink: true,
        }}
        SelectProps={{
          native: true,
          inputProps: { name: 'addressRegion' },
        }}
        margin="normal"
      >
        {states.map(s => (
          <option key={`addressRegion-${s}`} value={s}>
            {s}
          </option>
        ))}
      </TextField>

      <TextField
        id="postalCode"
        label="Zipcode"
        required
        fullWidth
        value={props.postalCode}
        InputLabelProps={{
          shrink: true,
        }}
        error={!!props.processErrors(props.parsedErrors.postalCode)}
        helperText={props.processErrors(props.parsedErrors.postalCode)}
        onChange={props.handleChange('postalCode')}
        margin="normal"
      />
      <TextField
        id="country"
        required
        disabled
        fullWidth
        label="Country"
        error={!!props.parsedErrors.addressCountry}
        helperText={props.processErrors(props.parsedErrors.addressCountry)}
        value="United States"
        InputLabelProps={{
          shrink: true,
        }}
        SelectProps={{
          native: true,
          inputProps: {
            defaultValue: 'United States',
          },
        }}
        margin="normal"
      />
    </div>
  </Fragment>
);

export default CheckoutBillingInfo;

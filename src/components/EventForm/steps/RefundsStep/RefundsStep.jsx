//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import { Select } from 'lib/redux-form-material-ui';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { validateRequired } from 'helpers/validation';
import errorArrayParser from 'helpers/errorArrayParser';

type Props = {};

type State = {};

class RefundsStep extends Component<Props, State> {
  state: State;
  props: Props;

  render() {
    const { errors } = this.props;
    const refundPolicyError = errorArrayParser(errors, 'refund_policy');
    return (
      <Field
        name="refundPolicy"
        component={Select}
        validate={validateRequired}
        label="Return Policy"
        required
        message={refundPolicyError}
      >
        <MenuItem key={0} value={0}>
          No Refunds
        </MenuItem>
        <MenuItem key={1} value={1}>
          1 Day
        </MenuItem>
        <MenuItem key={2} value={3}>
          3 Days
        </MenuItem>
        <MenuItem key={3} value={7}>
          7 Days
        </MenuItem>
      </Field>
    );
  }
}

export default reduxForm({ destroyOnUnmount: false })(RefundsStep);

//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
// UI Components
import { TextField } from 'lib/redux-form-material-ui';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
// Helpers
import { validateRequired } from 'helpers/validation';

class BillingForm extends React.Component {
  handleSave() {}

  render() {
    return (
      <div style={{ width: '100%' }}>
        <Field
          name="firstName"
          component={TextField}
          required
          fullWidth
          label="First name"
          message=""
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <br />
        <Field
          name="lastName"
          component={TextField}
          required
          fullWidth
          label="Last name"
          message=""
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <br />
        <Field
          name="companyName"
          component={TextField}
          required
          fullWidth
          label="Company name"
          message=""
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <br />
        <Field
          name="streetAddress"
          component={TextField}
          required
          fullWidth
          label="Street"
          message=""
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <br />
        <Field
          name="addressLocality"
          component={TextField}
          required
          fullWidth
          label="Locality"
          message=""
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <br />
        <Field
          name="addressRegion"
          component={TextField}
          required
          fullWidth
          label="Region"
          message=""
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <br />
        <Field
          name="postalCode"
          component={TextField}
          required
          fullWidth
          label="Postal Code"
          message=""
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <br />
        <Field
          name="bankAccountType"
          component={TextField}
          required
          fullWidth
          label="Bank Account Type"
          message=""
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <br />
        <Field
          name="bankAccountNumber"
          component={TextField}
          required
          fullWidth
          label="Bank Account Number"
          message=""
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <br />
        <Field
          name="bankRoutingNumber"
          component={TextField}
          required
          fullWidth
          label="Bank Routing Number"
          message=""
          validate={validateRequired}
          ref={() => React.createRef()}
          withRef
        />
        <br />
        <Button color="inherit" onClick={this.handleSave}>
          Save
        </Button>
      </div>
    );
  }
}

export default BillingForm;

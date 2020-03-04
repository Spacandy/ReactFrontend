//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import { reduxForm, Field } from 'redux-form';
import CategoryMultiSelect from 'components/CategoryMultiSelect';
import { TextField } from 'lib/redux-form-material-ui';
import InputAdornment from '@material-ui/core/InputAdornment';
import URLReduxFormTextField from 'components/URLReduxFormTextField';

type Props = {
  choices: {
    categories: string | [string],
  },
  form: string,
  change: Function,
  errors: [string],
};

type State = {};

const styles = () => ({});

class PromoteStep extends Component<Props, State> {
  state: State;
  props: Props;

  render() {
    const { choices, initialValues, form, change, errors } = this.props;
    const { categories } = choices;
    return (
      <div style={{ width: '100%' }}>
        <CategoryMultiSelect
          categories={categories}
          initialValues={initialValues ? initialValues : null}
          change={change}
          errors={errors}
        />
        <br />
        <br />
        <br />
        <br />
        <Field
          name="organizerWebsite"
          component={TextField}
          fullWidth
          label="Organizer Website"
        />
        <br />
        <br />
        <Field
          name="organizerFacebook"
          component={TextField}

          fullWidth
          label="Facebook Profile"
        />
        <br />
        <br />
        <Field
          name="organizerInstagram"
          component={TextField}
          fullWidth
          label="Instagram Profile"
        />
        <br />
        <br />
        <Field
          name="organizerTwitter"
          component={TextField}
          fullWidth
          label="Twitter Profile"
        />
      </div>
    );
  }
}

export default compose(
  reduxForm({
    destroyOnUnmount: false,
  }),
  withStyles(styles),
)(PromoteStep);
